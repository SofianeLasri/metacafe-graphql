import {Op} from 'sequelize'
import {User} from "../models";
import {UserInput, UserOutput} from "../models/User";
import {GetAllUsersFilters} from "./types";
import bcrypt from "bcrypt";

export const create = async (payload: UserInput): Promise<UserOutput> => {
    return await User.create(payload);
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user: User | null = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(payload);
}

export const getById = async (id: number): Promise<UserOutput> => {
    const user: User | null = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return user;
}

export const getByEmail = async (email: string): Promise<UserOutput> => {
    const user: User | null = await User.findOne({
        where: {
            email,
        },
    });
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