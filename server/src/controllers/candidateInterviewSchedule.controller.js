import { CandidateInterviewSchedule } from "../models/candidateInterviewSchdeual.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { ApiError } from "../utils/apiError.js";
import { Candidate } from "../models/candidate.model.js";
import { User } from "../models/user.model.js";

const CreateCandidateInterviewSchedule = asyncHandler(async (req, res) => {
  const { candidateID, interviewer, candidateStatus, DateTime } = req.body;

  if (!candidateID && !interviewer && !DateTime) {
    throw new ApiError(400, "Required All Fields");
  }

  const candidate = await Candidate.findById({ _id: candidateID });

  if (!candidate) throw new ApiError(404, "Candidate not Found");

  const user = await User.findById({ _id: interviewer }).select(
    " -password -refreshToken"
  );

  if (!user) throw new ApiError(404, "User not Found");

  const candidateInterviewSchedule = CandidateInterviewSchedule.create({
    candidateID,
    interviewer,
    candidateStatus,
    DateTime,
  });

  if (!candidateInterviewSchedule)
    throw new ApiError(500, " oops! Somthing went wrong");

  return res
    .status(200)
    .json(new ApiResponce(200, {}, "Schedule Created successfully"));
});

export { CreateCandidateInterviewSchedule };
