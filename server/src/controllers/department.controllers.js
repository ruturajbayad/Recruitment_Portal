import { Department } from "../models/department.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponce } from "../utils/apiResponce.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addDepartment = asyncHandler(async (req, res) => {
  const nameOfDepartment = req.body;

  if (!nameOfDepartment) {
    throw new ApiError(400, "Department is required");
  }

  const newDepartment = await Department.create(nameOfDepartment);

  if (!newDepartment) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponce(200, newDepartment, "Department added successfully"));
});

const departments = asyncHandler(async (req, res) => {
  const departments = await Department.find().select(" _id nameOfDepartment");

  if (!departments) {
    throw new ApiError(500, "Something went wrong");
  }

  return res
    .status(200)
    .json(
      new ApiResponce(200, departments, "Departments fetched successfully")
    );
});

export { addDepartment, departments };
