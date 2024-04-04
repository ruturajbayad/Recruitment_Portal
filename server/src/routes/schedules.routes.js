import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
import { CreateCandidateInterviewSchedule } from "../controllers/candidateInterviewSchedule.controller.js";
const router = Router();

router
  .route("/create-schedule")
  .post(verifyJwt, CreateCandidateInterviewSchedule);

export default router;
