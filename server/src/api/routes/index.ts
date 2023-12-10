import {Router} from "express";
import userRouter from "./users";
import authRouter from "./authentication";
import attachmentRouter from "./attachment";

const router: Router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/attachment', attachmentRouter);

export default router;