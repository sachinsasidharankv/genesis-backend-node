import { Router } from "express";
import { AgentController } from "./controller";

const router = Router();

const agentController = new AgentController();

router.post('/chat', (req, res) => agentController.ask(req, res));

export const agentRoute = router;