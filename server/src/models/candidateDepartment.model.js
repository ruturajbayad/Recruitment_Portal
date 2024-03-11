import mongoose from "mongoose";

const candidateDepartmentSchema = new mongoose.Schema(
  {
    candidateID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },
    departmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const CandidateDepartment = new mongoose.model(
  "CandidateDepartment",
  candidateDepartmentSchema
);
