import { Router } from "express";
import {
  addDepartment,
  departments,
} from "../controllers/department.controllers.js";

const router = Router();

router.route("/add-department").post(addDepartment);
router.route("/departments").get(departments);

export default router;
