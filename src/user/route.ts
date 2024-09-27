import { Router } from "express";
import { UserController } from './controller';

const router = Router();

const userController = new UserController();

router.post('/', (req, res) => userController.createUser(req, res));

export const userRouter = router;