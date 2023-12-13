import {Op} from 'sequelize'
import {CenterOfInterest, Friend, User} from "../models";
import {UserInput, UserOutput} from "../models/User";
import {GetAllUsersFilters} from "./types";
import * as AttachmentDAL from './attachment';
import {AttachmentOutput} from "../models/Attachment";
import {friendRelationType} from "../models/Friend";

export const create = async (payload: UserInput): Promise<UserOutput> => {
    let user: User = await User.create(payload);
    // Ajout de l'utilisateur bot Métacafé dans la liste d'amis
    addFriend(user.id, 1, 'friend');
    return user;
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

export const getFriends = async (userId: number): Promise<UserOutput[]> => {
    try {
        const friends = await Friend.findAll({
            where: {
                [Op.or]: [
                    {userId: userId, relationType: 'friend'},
                    {friendUserId: userId, relationType: 'friend'},
                ],
            },
            include: [
                {
                    model: User,
                    as: 'user',
                },
            ],
        });
        return friends.map((friend) => friend.user);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get user friends');
    }
};

export const areFriends = async (userId: number, friendUserId: number): Promise<boolean> => {
    try {
        const areFriends = await Friend.findOne({
            where: {
                [Op.or]: [
                    {userId: userId, friendUserId: friendUserId, relationType: 'friend'},
                    {userId: friendUserId, friendUserId: userId, relationType: 'friend'},
                ],
            },
        });
        return !!areFriends;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to check if users are friends');
    }
}

export const addFriend = async (userId: number, friendUserId: number, relationType: friendRelationType = "pending"): Promise<void> => {
    try {
        // Créez une entrée dans la table Friend pour l'utilisateur courant
        await Friend.create({
            userId: userId,
            friendUserId: friendUserId,
            relationType: relationType,
        });

        // Créez une entrée dans la table Friend pour l'utilisateur à ajouter
        await Friend.create({
            userId: friendUserId,
            friendUserId: userId,
            relationType: relationType,
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add friend');
    }
};

export const removeFriend = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Supprimez l'entrée dans la table Friend pour l'utilisateur courant
        await Friend.destroy({
            where: {
                userId: userId,
                friendUserId: friendUserId,
            },
        });

        // Supprimez l'entrée dans la table Friend pour l'utilisateur à supprimer
        await Friend.destroy({
            where: {
                userId: friendUserId,
                friendUserId: userId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to remove friend');
    }
};

export const blockFriend = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Mettez à jour l'entrée dans la table Friend pour bloquer l'utilisateur
        await Friend.update(
            {relationType: 'blocked'},
            {
                where: {
                    userId: userId,
                    friendUserId: friendUserId,
                },
            }
        );

        // Supprimez l'entrée dans la table Friend pour l'utilisateur à bloquer et comme friendUserId l'id de l'utilisateur courant.
        await Friend.destroy({
            where: {
                userId: friendUserId,
                friendUserId: userId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to block friend');
    }
};

export const unblockFriend = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Mettez à jour l'entrée dans la table Friend pour débloquer l'utilisateur
        await Friend.update(
            {relationType: 'friend'},
            {
                where: {
                    userId: userId,
                    friendUserId: friendUserId,
                },
            }
        );

        // Créez une entrée dans la table Friend pour l'utilisateur à débloquer et comme friendUserId l'id de l'utilisateur courant et comme relationType 'friend'
        await Friend.findOrCreate({
            where: {
                userId: friendUserId,
                friendUserId: userId,
            },
            defaults: {
                userId: friendUserId,
                friendUserId: userId,
                relationType: 'friend',
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to unblock friend');
    }
};

export const acceptFriendRequest = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Mettez à jour l'entrée dans la table Friend pour accepter la demande d'ami
        await Friend.update(
            {relationType: 'friend'},
            {
                where: {
                    userId: userId,
                    friendUserId: friendUserId,
                },
            }
        );

        // Créez une entrée dans la table Friend pour l'utilisateur à accepter comme ami
        await Friend.findOrCreate({
            where: {
                userId: friendUserId,
                friendUserId: userId,
            },
            defaults: {
                userId: friendUserId,
                friendUserId: userId,
                relationType: 'friend',
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to accept friend request');
    }
};

export const rejectFriendRequest = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Supprimez l'entrée dans la table Friend pour rejeter la demande d'ami
        await Friend.destroy({
            where: {
                userId: userId,
                friendUserId: friendUserId,
            },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Failed to reject friend request');
    }
};

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