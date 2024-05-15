import mongoose from "mongoose";

const candidateInterviewScheduleSchema = new mongoose.Schema(
  {
    candidateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidateStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CandidateStatus",
      // required: true,
    },
    round: {
      type: Number,
      required: true,
      default: 1,
    },
    dateTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CandidateInterviewSchedule = new mongoose.model(
  "CandidateInterviewSchedule",
  candidateInterviewScheduleSchema
);
