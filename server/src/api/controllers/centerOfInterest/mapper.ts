import {CenterOfInterestOutput} from "../../../db/models/CenterOfInterest";
import {CenterOfInterest} from "../../interfaces";

export const toCenterOfInterest = (centerOfInterest: CenterOfInterestOutput): CenterOfInterest => {
    return {
        id: centerOfInterest.id,
        name: centerOfInterest.name,
        createdAt: centerOfInterest.createdAt,
        updatedAt: centerOfInterest.updatedAt,
        deletedAt: centerOfInterest.deletedAt,
    }
}