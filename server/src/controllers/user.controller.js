import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { fullname, email, password, username } = req.body;

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

export { registerUser };
