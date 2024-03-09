import mongoose from "mongoose";

const userDepartmentSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  departmentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
  },
});

export const UserDepartmentSchema = new mongoose.model(
  "UserDepartment",
  userDepartmentSchema
);
