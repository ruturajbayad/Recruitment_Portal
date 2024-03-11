import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    Firstname: {
      type: String,
      required: true,
    },
    Lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobileNo: {
      type: Number,
      required: true,
      minlength: 10,
    },
    DoB: {
      type: Date,
      required: true,
    },
    education: {
      type: String,
      enum: [
        "BSC",
        "MSC",
        "BE IT",
        "BE Computer",
        "ME IT",
        "ME Computer",
        "Other",
      ],
      required: true,
    },
    experiance: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    resume: {
      type: String, // url of file
      // required: true,
    },
    WorkLocation: {
      type: String,
      enum: ["Work from Home", "Work From Office", "Hybrid"],
      required: true,
    },
    isCurrentlyWorking: {
      type: Boolean,
      required: true,
      default: false,
    },
    CurrentCompany: {
      type: String,
    },
    CTC: {
      type: Number,
    },
    ETC: {
      type: Number,
    },
    isNegotiable: {
      type: Boolean,
    },
    ReasonforChange: {
      type: String,
    },
    NoticePeriod: {
      type: Number,
    },
    isAnyGap: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export const Candidate = mongoose.model("Candidate", candidateSchema);
