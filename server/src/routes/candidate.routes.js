import { Router } from "express";
import {
  DeleteCandidateDetails,
  ShowCandidateDetails,
  uploadCandidatesDetails,
} from "../controllers/candidate.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";
const router = Router();

router
  .route("/uploadCandidateDetails")
  .post(upload.single("resume"), verifyJwt, uploadCandidatesDetails);

router.route("/show-candidate").get(verifyJwt, ShowCandidateDetails);
router.route("/delete-candidate/:id").delete(verifyJwt, DeleteCandidateDetails);

export default router;
