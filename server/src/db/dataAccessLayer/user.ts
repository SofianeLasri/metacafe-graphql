import {Op} from 'sequelize'
import User, {UserInput, UserOutput} from "../models/User";
import {GetAllUsersFilters} from "./types";

export const create = async (paylod: UserInput): Promise<UserOutput> => {
    return await User.create(paylod);
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(payload);
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedUserCount = await User.destroy({
        where: {
            id,
        },
    });
    return !!deletedUserCount;
}

export const getAll = async (filters?: GetAllUsersFilters): Promise<UserOutput[]> => {
    const queryOptions: any = {
        where: {},
    };

    if (filters) {
        if (filters.isDeleted) {
            queryOptions.where.deletedAt = {[Op.not]: null};
        }

        if (filters.isDeleted || filters.includeDeleted) {
            queryOptions.paranoid = true;
        }
    }

    return User.findAll(queryOptions);
};
