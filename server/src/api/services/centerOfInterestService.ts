import * as centerOfInterestDal from "../../db/dataAccessLayer/centerOfInterest";
import {CenterOfInterestOutput} from "../../db/models/CenterOfInterest";

export const matchByName = async (name: string): Promise<CenterOfInterestOutput[]> => {
    return centerOfInterestDal.matchByName(name);
}