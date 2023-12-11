import {Router} from "express";
import * as centerOfInterestController from "../controllers/centerOfInterest";
import {CenterOfInterest} from "../interfaces";
import {isAuthenticated, jsonParser} from "../infrastructure/authentication";

const router: Router = Router();

type centerOfInterest = {
    id: number;
    name: string;
};

router.post('/matchByName', isAuthenticated, jsonParser, async (req, res) => {
    const name: string = req.body.search;
    const centerOfInterests: CenterOfInterest[] = await centerOfInterestController.matchByName(name);

    let ResponseCenterOfInterest: centerOfInterest[] = [];
    for (const centerOfInterest of centerOfInterests) {
        ResponseCenterOfInterest.push({
            id: centerOfInterest.id,
            name: centerOfInterest.name,
        });
    }
    res.json(ResponseCenterOfInterest);
});

export default router;