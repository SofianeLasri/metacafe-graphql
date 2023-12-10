import {CenterOfInterest} from "../models";
import {CenterOfInterestOutput} from "../models/CenterOfInterest";
import {Op} from "sequelize";

export const matchByName = async (name: string): Promise<CenterOfInterestOutput[]> => {
    return CenterOfInterest.findAll({
        where: {
            name: {
                [Op.like]: `%${name}%`,
            },
        },
    });
}