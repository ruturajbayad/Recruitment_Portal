import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema(
  {
    nameOfDepartment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Department = mongoose.model("Department", departmentSchema);
