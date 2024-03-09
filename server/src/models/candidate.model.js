import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    experiance: {
      type: String,
    },
    qualification: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    mobileNo: {
      type: Number,
      required: true,
      minlength: 10,
    },
    resume: {
      type: String, // url of file
      // required: true,
    },
    feedback: {
      type: String,
    },
    isSelected: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);