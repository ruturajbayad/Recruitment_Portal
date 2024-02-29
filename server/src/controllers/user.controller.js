import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

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

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, username, role, department, skills } =
    req.body;

  if (
    [email, password, username, fullname].some((feild) => feild?.trim() === "")
  ) {
    throw new ApiError(400, "All required fields");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(400, "user is already registered");
  }

  const user = await User.create({
    fullname,
    email,
    password,
    username,
    role,
    department,
    skills,
  });
  const createdUser = await User.findOne(user._id).select(
    " -password -refreshToken "
  );

  if (!createdUser) {
    throw new ApiError(500, "Internal server error");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, createdUser, "User created successfully"));
});

const loginUeser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(401, "Email or Username must require");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

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

const getUserDetails = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponce(200, req.user, "User details fetched successfully"));
});

const updateUserDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;

  if (!(fullname && email)) {
    throw new ApiError(400, "All required fields");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    {
      new: true,
    }
  ).select(" -password ");

  return res
    .status(200)
    .json(
      new ApiResponce(200, user, "fullname and Password updated successfully")
    );
});

export {
  registerUser,
  loginUeser,
  logoutUser,
  getUserDetails,
  updateUserDetails,
};
