import { CandidateInterviewSchedule } from "../models/candidateInterviewSchdeual.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { ApiError } from "../utils/apiError.js";
import { Candidate } from "../models/candidate.model.js";
import { User } from "../models/user.model.js";
import { UserDepartment } from "../models/userDepartment.model.js";
import { CandidateDepartment } from "../models/candidateDepartment.model.js";

const createCandidateInterviewSchedule = asyncHandler(async (req, res) => {
  const { candidateID, interviewer, round, dateTime } = req.body;

  // Check if all required fields are provided
  if (
    [candidateID, interviewer, round, dateTime].some(
      (feild) => feild?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All required fields");
  }

  // Check if candidate with provided ID exists
  const candidate = await Candidate.findById(candidateID);
  if (!candidate) {
    throw new ApiError(404, "Candidate not found");
  }

  // Check if user with provided ID exists and retrieve necessary data
  const user = await User.findById(interviewer).select(
    "-password -refreshToken"
  );
  if (!user) {
    throw new ApiError(404, "Interviewer not found");
  }

  // Create candidate interview schedule
  const candidateInterviewSchedule = await CandidateInterviewSchedule.create({
    candidateID,
    interviewer,
    round,
    dateTime,
  });

  if (!candidateInterviewSchedule) {
    throw new ApiError(500, "Failed to create schedule");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, {}, "Schedule created successfully"));
});

// ! Show Candidate Data
const ShowData = asyncHandler(async (req, res) => {
  const candidates = await Candidate.find().select("Lastname Firstname _id");

  const populatedCandidates = await Promise.all(
    candidates.map(async (candidate) => {
      const candidateDepartment = await CandidateDepartment.find({
        candidateID: candidate._id,
      })
        .populate("departmentID")
        .select(" _id nameOfDepartment");
      const departments = candidateDepartment.map(
        (candidateDept) => candidateDept.departmentID
      );
      return { ...candidate.toObject(), departments };
    })
  );

  const users = await User.find({ UserRole: "Technical Person" }).select(
    " firstName lastName _id"
  );

  const populatedInterViewer = await Promise.all(
    users.map(async (user) => {
      const userDepartments = await UserDepartment.find({
        userID: user._id,
      })
        .populate("departmentID")
        .select(" _id nameOfDepartment");
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
    .json(
      new ApiResponce(
        200,
        { populatedCandidates, populatedInterViewer },
        "Data Fetched"
      )
    );
});

// ! All Schdule
const getAllSchedules = asyncHandler(async (req, res) => {
  try {
    const schedules = await CandidateInterviewSchedule.find()
      .populate("candidateID", "Firstname Lastname")
      .populate("interviewer", "firstName lastName")
      .select("candidateID interviewer dateTime");

    res
      .status(200)
      .json(
        new ApiResponce(200, schedules, "All schedules fetched successfully")
      );
  } catch (error) {
    // Handle errors
    throw new ApiError(500, "Internal Server Error");
  }
});

// ! DELETE SCHEDULE
const DeleteSchedule = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    const schedule = await CandidateInterviewSchedule.findByIdAndDelete({
      _id: id,
    });
    if (!schedule) {
      throw new ApiError(404, "Schedule not found");
    }
    res
      .status(200)
      .json(new ApiResponce(200, {}, "Schedule deleted successfully"));
  } catch (error) {
    // Handle errors
    throw new ApiError(500, "Internal Server Error");
  }
});
export {
  createCandidateInterviewSchedule,
  ShowData,
  getAllSchedules,
  DeleteSchedule,
};
