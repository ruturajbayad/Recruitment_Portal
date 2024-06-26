import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { mailer } from "../utils/nodeMailer.js";
import { Department } from "../models/department.model.js";
import { UserDepartment } from "../models/userDepartment.model.js";
// import mongoose from "mongoose";

//! For JWT gerneration purposes
const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({
      validateBeforeSave: false,
    });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while gerating refresh token"
    );
  }
};

//? All User Controllers ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ! ADD USER
const addUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, UserRole, departments } =
    req.body;

  if (
    [email, password, firstName, lastName].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All required fields");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "user is already registered");
  }

  if (departments.length < 0) {
    throw new ApiError(400, "All required fields");
  }

  const user = await User.create({
    firstName,
    email,
    password,
    lastName,
    UserRole,
  });

  const userDepartment = departments.map(async (departmentobj) => {
    const department = await Department.findById(departmentobj);

    if (!department) {
      throw new ApiError(400, "Department not found");
    }

    const departmentID = department._id;
    const userID = user._id;
    const userDepartment = await UserDepartment.create({
      userID,
      departmentID,
    });

    if (!userDepartment) {
      throw new ApiError(500, "Internal server error");
    }

    return userDepartment;
  });

  const createdUser = await User.findOne(user._id).select(
    " -password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(500, "Internal server error");
  }

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        { createdUser, userDepartment },
        "User created successfully"
      )
    );
});

// ! LOGIN USER
const loginUeser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(401, "Email or Username must require");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User Not found");
  }
  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid Credentials");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    " -password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accesToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponce(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

// ! LOGOUT USER
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accesToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponce(200, {}, "User Loged Out Sccessfully"));
});

// ! GET USER DATA
const getUserDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponce(200, req.user, "User details fetched successfully"));
});

// ! UPDATE USER DATA
const updateUserDetails = asyncHandler(async (req, res) => {
  const { firstName, email, lastName, UserRole, departments } = req.body;

  if (!email) {
    throw new ApiError(400, "All required fields");
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName,
        email,
        lastName,
        UserRole,
      },
    },
    {
      new: true,
    }
  ).select(" -password -refreshToken ");

  // Fetch existing user departments
  const existingUserDepartments = await UserDepartment.find({
    userID: user._id,
  });

  // Extract department IDs from existing user departments
  const existingDepartmentIDs = existingUserDepartments.map((dep) =>
    dep.departmentID.toString()
  );

  // Identify departments to be updated and inserted
  const departmentsToUpdate = [];
  const departmentsToInsert = [];
  const departmentsToRemove = [];

  departments.forEach((department) => {
    if (existingDepartmentIDs.includes(department._id.toString())) {
      // Department exists, add to update list
      departmentsToUpdate.push(department);
    } else {
      // Department doesn't exist, add to insert list
      departmentsToInsert.push(department);
    }
  });

  existingUserDepartments.forEach((department) => {
    if (
      !departments.find(
        (dep) => dep._id.toString() === department.departmentID.toString()
      )
    ) {
      departmentsToRemove.push(department);
    }
  });

  // Update existing user departments
  const updateOperations = departmentsToUpdate.map(async (department) => {
    await UserDepartment.updateMany(
      { userID: user._id, departmentID: department._id },
      { $set: { departmentID: department._id } },
      { new: true, multi: true }
    );
  });

  // Insert new user departments
  const insertOperations = departmentsToInsert.map(async (department) => {
    await UserDepartment.create({
      userID: user._id,
      departmentID: department._id,
    });
  });

  // Remove departments no longer associated with the user
  const removeOperations = departmentsToRemove.map(async (department) => {
    await UserDepartment.deleteMany({ _id: department._id });
  });

  // Wait for all update and insert operations to complete
  await Promise.all([
    ...updateOperations,
    ...insertOperations,
    ...removeOperations,
  ]);

  return res
    .status(200)
    .json(
      new ApiResponce(200, user, "fullname and Password updated successfully")
    );
});

// ! REFRESH ACCESSTOKEN
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(404, "Refresh token not available");
  }

  const decodedToken = jwt.verify(
    incomingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);

  if (!user) {
    throw new ApiError(404, "Invalid user");
  }

  if (incomingRefreshToken !== user?.refreshToken) {
    throw new ApiError(404, "Invalid refresh token");
  }

  const { accessToken, newRefreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponce(
        200,
        {
          user: user,
          accessToken,
          refreshToken: newRefreshToken,
        },
        "Refresh token refreshed successfully"
      )
    );
});

// ! FORGOT PASSWORD MAIL
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email }).select(" -password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not Found");
  }

  const token = jwt.sign({ id: user._id }, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "60m",
  });

  const response = mailer(user.email, user._id, token);

  if (!response) {
    throw new ApiError(500, "Something went wrong with password reset link");
  }
  return res
    .status(200)
    .json(new ApiResponce(200, {}, "Password reset link sent to your email"));
});

// ! RESET PASSWORD
const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { newPassword } = req.body;

  try {
    const decodedToken = jwt.verify(token, process.env.RESET_TOKEN_SECRET);

    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(404, "User not found");
    }
    user.password = newPassword;
    await user.save({ validateBeforeSave: false });
    return res
      .status(200)
      .json(new ApiResponce(200, {}, "password updated successfully"));
  } catch (error) {
    throw new ApiError(401, "Link is expired");
  }
});

// ! AUTHENTICATION
const authentication = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponce(200, {}, "User authenticated successfully"));
});

// ! Display All Users
const displayAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select(" -password -refreshToken");

  const populatedUsers = await Promise.all(
    users.map(async (user) => {
      const userDepartments = await UserDepartment.find({
        userID: user._id,
      }).populate("departmentID");
      const departments = userDepartments.map(
        (userDept) => userDept.departmentID
      );
      return { ...user.toObject(), departments };
    })
  );

  if (!users) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, populatedUsers, "Get all users"));
});

//! Delete User
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  // console.log(userId);
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const deletedDepartment = await UserDepartment.deleteMany({ userID: userId });

  if (!deletedDepartment) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, {}, "User deleted successfully"));
});

// ! return Role
const userRole = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const userrole = await User.findById(user._id).select(
    " -password -refreshToken -firstName -email -lastName"
  );
  // console.log(userrole);
  return res
    .status(200)
    .json(new ApiResponce(200, userrole, "user role fatced successfully"));
});

//! GET ONE USER DETAILS
const GetSpacificUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    throw new ApiError(401, "Need Id");
  }

  const user = await User.findById({ _id: userId }).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const userDepartment = await UserDepartment.find({ userID: userId }).populate(
    "departmentID"
  );
  const departments = userDepartment.map((userDept) => userDept.departmentID);
  // const departmentsID = userDepartment.map((userDept) => userDept._id);

  const userWithDepartment = { ...user.toObject(), departments };
  return res
    .status(200)
    .json(
      new ApiResponce(200, userWithDepartment, "User Fetched successfully")
    );
});
export {
  addUser,
  loginUeser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  authentication,
  displayAllUsers,
  deleteUser,
  userRole,
  GetSpacificUser,
};
