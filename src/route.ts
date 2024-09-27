import { Router } from "express";
import { agentRoute } from "./agent/route";
import { assessmentRoute } from "./assessment/route";

const router = Router();
router.use('/agent', agentRoute)
router.use('/assessment', assessmentRoute)

export const globalRouter = router;