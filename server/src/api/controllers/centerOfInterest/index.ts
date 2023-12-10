import { CenterOfInterest } from "../../interfaces";
import * as service from "../../services/centerOfInterestService";
import * as mapper from './mapper'

export const matchByName = async (name: string): Promise<CenterOfInterest[]> => {
    return (await service.matchByName(name)).map(mapper.toCenterOfInterest);
}