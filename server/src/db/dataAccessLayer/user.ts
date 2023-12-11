import {Op} from 'sequelize'
import {CenterOfInterest, User} from "../models";
import {UserInput, UserOutput} from "../models/User";
import {GetAllUsersFilters} from "./types";
import * as AttachmentDAL from './attachment';
import {AttachmentOutput} from "../models/Attachment";

export const create = async (payload: UserInput): Promise<UserOutput> => {
    return await User.create(payload);
}

export const update = async (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    const user: User | null = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.update(payload);
}

export const updateProfilePicture = async (userId: number, profilePicture: Express.Multer.File): Promise<UserOutput> => {
    try {
        const attachment: AttachmentOutput = await AttachmentDAL.create(userId, profilePicture);
        return await update(userId, {profilePicture: attachment.id});
    } catch (error) {
        console.error(error);
        throw new Error('Failed to update user profile picture');
    }
}

export const getCentersOfInterest = async (id: number): Promise<CenterOfInterest[]> => {
    const user: User | null = await User.findByPk(id);
    if (!user) throw new Error('User not found');
    return await user.getCenterOfInterests();
}

export const addCenterOfInterest = async (userId: number, centerOfInterestId: number): Promise<void> => {
    const user: User | null = await User.findByPk(userId);
    if (!user) throw new Error('User not found');
    const centerOfInterest: CenterOfInterest | null = await CenterOfInterest.findByPk(centerOfInterestId);
    if (!centerOfInterest) throw new Error('Center of interest not found');
    await user.addCenterOfInterest(centerOfInterest);
}

export const setCenterOfInterests = async (userId: number, centerOfInterestIds: number[]): Promise<void> => {
    const user: User | null = await User.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.removeCenterOfInterests(await user.getCenterOfInterests());

    for (const centerOfInterestId of centerOfInterestIds) {
        await addCenterOfInterest(userId, centerOfInterestId);
    }
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