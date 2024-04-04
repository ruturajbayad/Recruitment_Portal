import mongoose from "mongoose";

const candidateStatusSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CandidateStatus = new mongoose.model(
  "CandidateStatus",
  candidateStatusSchema
);
