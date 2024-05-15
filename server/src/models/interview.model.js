import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cnadidate",
      required: true,
    },
    schedule: {
      type: Date,
      required: true,
    },
    isInterviewCompleted: {
      type: Boolean,
      default: false,
    },
    roundofinterview: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

export const Interview = mongoose.model("Interview", interviewSchema);
