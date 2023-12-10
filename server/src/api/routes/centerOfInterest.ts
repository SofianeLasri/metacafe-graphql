import {Router} from "express";
import * as centerOfInterestController from "../controllers/centerOfInterest";
import {CenterOfInterest} from "../interfaces";
import {isAuthenticated} from "../infrastructure/authentication";

const router: Router = Router();

router.post('/matchByName', isAuthenticated, async (req, res) => {
    const name: string = req.body.name;
    const centerOfInterest: CenterOfInterest[] = await centerOfInterestController.matchByName(name);
    res.json(centerOfInterest);
});

export default router;