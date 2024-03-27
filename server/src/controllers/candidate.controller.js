import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Candidate } from "../models/candidate.model.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  deleteFileFromCloudinary,
  uploadInCloudinary,
} from "../utils/cloudinary.js";
import { Department } from "../models/department.model.js";
import { CandidateDepartment } from "../models/candidateDepartment.model.js";
import Path, { resolve } from "path";

// ! Add Candidates
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
  // console.log(resumeLocalPath);
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

// ! Show All Candidates
const ShowCandidateDetails = asyncHandler(async (req, res) => {
  const candidate = await Candidate.find();
  // console.log(candidate);
  res
    .status(200)
    .json(new ApiResponce(200, candidate, "Data Get Successfully"));
});

// ! Delete Candidate Details
const DeleteCandidateDetails = asyncHandler(async (req, res) => {
  const candidateId = await req.params.id;

  // const
  const candidate = await Candidate.findByIdAndDelete({
    _id: candidateId,
  }).select(" resume -_id");
  // console.log(candidate.resume);

  if (!candidate) {
    throw new ApiError(404, "candidate not found");
  }

  const deletedCandidateDepartement = await CandidateDepartment.deleteMany({
    candidateID: candidateId,
  });

  if (!deletedCandidateDepartement) {
    throw new ApiError(500, "Something went wrong when deleting candidate");
  }
  const filepath = candidate.resume;
  const file = Path.basename(filepath);
  deleteFileFromCloudinary(Path.parse(file).name);
  res
    .status(200)
    .json(new ApiResponce(200, {}, "Candidate deleted successfully"));
});

// ! Single Candidate
const SingleCandidate = asyncHandler(async (req, res) => {
  const candidateID = req.params.id;

  if (!candidateID) {
    throw new ApiError(400, "Candidate ID is required");
  }

  const candidate = await Candidate.findById(candidateID);

  if (!candidate) {
    throw new ApiError(404, "Candidate not found");
  }

  const candidateDepartment = await CandidateDepartment.find({
    candidateID: candidateID,
  }).populate("departmentID");

  const departments = candidateDepartment.map(
    (candidateDepartment) => candidateDepartment.departmentID
  );

  const CandidateWithDepartment = { ...candidate.toObject(), departments };

  return res
    .status(200)
    .json(
      new ApiResponce(
        200,
        CandidateWithDepartment,
        "Candidate Fetched successfully"
      )
    );
});

// ! Update Cadnididate Details
const updatecandidate = asyncHandler(async (req, res) => {
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
  const candidateID = req.params.id;

  if (!candidateID) throw new ApiError(400, "Id is required");

  const candidate = await Candidate.findById({ _id: candidateID });

  if (!candidate) {
    throw new ApiError(404, "Candidate Not Found");
  }

  const updatedCandidate = await Candidate.findByIdAndUpdate(
    candidate._id,
    {
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
    },
    { new: true }
  );

  if (!updatedCandidate) throw new ApiError(500, "Somthing went Wrong");

  const existingCandidateDepartments = await CandidateDepartment.find({
    candidateID: candidate._id,
  });

  const existingCandidateDepartmentIDs = existingCandidateDepartments.map(
    (dep) => dep.departmentID.toString()
  );

  const departmentsArray = Array.isArray(departments)
    ? departments
    : [departments];

  const departmentsToUpdate = [];
  const departmentsToInsert = [];
  const departmentsToRemove = [];

  departmentsArray.forEach((department) => {
    if (existingCandidateDepartmentIDs.includes(department)) {
      departmentsToUpdate.push(department);
    } else {
      departmentsToInsert.push(department);
    }
  });

  existingCandidateDepartmentIDs.forEach((id) => {
    if (!departmentsArray.includes(id)) {
      departmentsToRemove.push(id);
    }
  });

  const updateOperations = departmentsToUpdate.map(async (department) => {
    await CandidateDepartment.updateMany(
      {
        candidateID: candidate.id,
        departmentID: department,
      },
      { $set: { departmentID: department } },
      { new: true, multi: true }
    );
  });

  const insertOperations = departmentsToInsert.map(async (department) => {
    await CandidateDepartment.create({
      candidateID: candidate.id,
      departmentID: department,
    });
  });

  const removeOperations = departmentsToRemove.map(async (department) => {
    await CandidateDepartment.deleteMany({
      candidateID: candidate.id,
      departmentID: department,
    });
  });

  await Promise.all([
    ...updateOperations,
    ...insertOperations,
    ...removeOperations,
  ]);

  return res
    .status(200)
    .json(new ApiResponce(200, {}, "Candidate Updated Successfully"));
});

export {
  uploadCandidatesDetails,
  ShowCandidateDetails,
  DeleteCandidateDetails,
  SingleCandidate,
  updatecandidate,
};
