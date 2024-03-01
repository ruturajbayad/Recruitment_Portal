import { Router } from "express";
import { uploadCandidatesDetails } from "../controllers/candidate.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
const router = Router();

router
  .route("/uploadCandidateDetails")
  .post(upload.single("resume"), verifyJwt, uploadCandidatesDetails);

export default router;
