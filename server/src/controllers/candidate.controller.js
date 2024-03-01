import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Candidate } from "../models/candidate.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadInCloudinary } from "../utils/cloudinary.js";

const uploadCandidatesDetails = asyncHandler(async (req, res) => {
  const {
    fullname,
    email,
    experiance,
    qualification,
    department,
    age,
    gender,
    mobileNo,
  } = req.body;

  if (!(fullname && email && mobileNo && qualification && age && gender)) {
    throw new ApiError(400, "All required fields");
  }

  const existingCandidate = await Candidate.findOne({
    $or: [{ email }],
  });

  if (existingCandidate) {
    throw new ApiError(400, "Candidate already exists");
  }

  const resumeLocalPath = req.file?.path;

  if (!resumeLocalPath) {
    throw new ApiError(400, "Resume is required");
  }

  const resume = await uploadInCloudinary(resumeLocalPath);

  if (!resume) {
    throw new ApiError(400, "Resume is required");
  }

  const candidate = await Candidate.create({
    fullname,
    email,
    experiance,
    qualification,
    department,
    resume: resume.url,
    age,
    gender,
    mobileNo,
  });

  const createdCandidate = await Candidate.findById(candidate._id);

  if (!createdCandidate) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        createdCandidate,
        "Candidate Details Uploaded Successfully"
      )
    );
});

export { uploadCandidatesDetails };
