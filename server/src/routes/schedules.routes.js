import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import {
  createCandidateInterviewSchedule,
  DeleteSchedule,
  getAllSchedules,
  ShowData,
} from "../controllers/candidateInterviewSchedule.controller.js";
const router = Router();

router
  .route("/create-schedule")
  .post(verifyJwt, createCandidateInterviewSchedule);
router.route("/show-data").get(verifyJwt, ShowData);
router.route("/all-schedules").get(verifyJwt, getAllSchedules);
router.route("/delete-schedule/:id").delete(verifyJwt, DeleteSchedule);

export default router;
