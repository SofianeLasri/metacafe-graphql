import {Router} from "express";
import usersRouter from "./users";
import authRouter from "./authentication";

const router: Router = Router();

router.use('/user', usersRouter);
router.use('/auth', authRouter);

export default router;