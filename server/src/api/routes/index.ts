import {Router} from "express";
import usersRouter from "./users";

const router: Router = Router();

router.use('/user', usersRouter);

export default router;