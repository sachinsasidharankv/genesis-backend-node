import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'OK' });
});

export const healthRouter = router;