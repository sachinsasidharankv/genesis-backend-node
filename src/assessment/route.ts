import { Router } from "express";
import { AssessmentController } from "./controller";

const router = Router();

const assessmentController = new AssessmentController();

router.post('/chat', (req, res) => assessmentController.chat(req, res));
router.post('/submit', (req, res) => assessmentController.submit(req, res));

export const assessmentRoute = router;