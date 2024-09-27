import { Router } from "express";
import { UserController } from './controller';

const router = Router();

const userController = new UserController();

router.post('/', (req, res) => userController.createUser(req, res));
router.post('/explain',(req, res) => userController.explainTopic(req, res));

export const userRouter = router;