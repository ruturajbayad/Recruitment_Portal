import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Candidate } from "../models/candidate.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadInCloudinary } from "../utils/cloudinary.js";
import { Department } from "../models/department.model.js";
import { CandidateDepartment } from "../models/candidateDepartment.model.js";

const uploadCandidatesDetails = asyncHandler(async (req, res) => {
  const {
    Firstname,
    Lastname,
    email,
    mobileNo,
    DoB,
    education,
    experiance,
    gender,
    WorkLocation,
    isCurrentlyWorking,
    CurrentCompany,
    CTC,
    ETC,
    isNegotiable,
    ReasonforChange,
    NoticePeriod,
    isAnyGap,
    departments,
  } = req.body;

  if (
    !(Firstname && Lastname && email && mobileNo && DoB && education && gender)
  ) {
    throw new ApiError(400, "All required fields");
  }

  const existingCandidate = await Candidate.findOne({ email });

  if (existingCandidate) {
    throw new ApiError(400, "Candidate already exists");
  }

  const resumeLocalPath = req.file?.path;
  console.log(resumeLocalPath);
  if (!resumeLocalPath) {
    throw new ApiError(400, "Resume is required");
  }

  const resume = await uploadInCloudinary(resumeLocalPath);

  if (!resume) {
    throw new ApiError(400, "Resume is required");
  }

  const candidate = await Candidate.create({
    Firstname,
    Lastname,
    email,
    mobileNo,
    DoB,
    education,
    experiance,
    gender,
    WorkLocation,
    isCurrentlyWorking,
    CurrentCompany,
    CTC,
    ETC,
    isNegotiable,
    ReasonforChange,
    NoticePeriod,
    isAnyGap,
    resume: resume.url,
  });

  const createdCandidate = await Candidate.findById(candidate._id);

  if (!createdCandidate) {
    throw new ApiError(500, "Something went wrong");
  }

  const departmentIds = departments.split(",");

  if (departmentIds.length < 0) {
    throw new ApiError(400, "All required fields");
  }

  const candidateDepartment = departmentIds.map(async (departmentobj) => {
    const department = await Department.findById(departmentobj);

    if (!department) {
      throw new ApiError(400, "Department not found");
    }

    const departmentID = department._id;
    const candidateID = candidate._id;
    const candidateDepartment = await CandidateDepartment.create({
      candidateID,
      departmentID,
    });

    if (!candidateDepartment) {
      throw new ApiError(500, "Internal server error");
    }

    return candidateDepartment;
  });

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        { createdCandidate, candidateDepartment },
        "Candidate Details Uploaded Successfully"
      )
    );
});

const ShowCandidateDetails = asyncHandler(async (req, res) => {
  const candidate = await Candidate.find();
  // console.log(candidate);
  res
    .status(200)
    .json(new ApiResponce(200, candidate, "Data Get Successfully"));
});

export { uploadCandidatesDetails, ShowCandidateDetails };
