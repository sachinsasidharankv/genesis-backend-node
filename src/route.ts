import { Router } from "express";
import { agentRoute } from "./agent/route";

const router = Router();
router.use('/agent', agentRoute)

export const globalRouter = router;