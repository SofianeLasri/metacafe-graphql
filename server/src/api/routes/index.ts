import {Router} from "express";
import userRouter from "./users";
import authRouter from "./authentication";
import attachmentRouter from "./attachment";
import centerOfInterestRouter from "./centerOfInterest";

const router: Router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/attachment', attachmentRouter);
router.use('/centerOfInterest', centerOfInterestRouter);

export default router;