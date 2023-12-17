import * as userDal from "../../db/dataAccessLayer/user";
import {UserInput, UserOutput} from "../../db/models/User";
import {GetAllUsersFilters} from "../../db/dataAccessLayer/types";
import {CenterOfInterest} from "../interfaces";
import {Activity} from "../../db/models";
import {friendRelationType} from "../../db/models/Friend";

export const create = async (payload: UserInput): Promise<UserOutput> => {
    let user: UserOutput = await userDal.create(payload);
    await userDal.addActivity(user.id, 1, 'friendRequest');
    await userDal.sendMessage(user.id, 1, 'Bienvenue sur Métacafé ! Ici tu peux rencontrer des gens qui partagent les mêmes centres d\'intérêt que toi. Utilise la fonction de recherche pour trouver des personnes qui partagent tes passions et envoie-leur un message pour faire connaissance !');
    return user;
}

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDal.update(id, payload);
}

export const updateProfilePicture = (id: number, profilePicture: Express.Multer.File): Promise<UserOutput> => {
    return userDal.updateProfilePicture(id, profilePicture);
}

export const getCentersOfInterest = (id: number): Promise<CenterOfInterest[]> => {
    return userDal.getCentersOfInterest(id);
}

export const addCenterOfInterest = (userId: number, centerOfInterestId: number): Promise<void> => {
    return userDal.addCenterOfInterest(userId, centerOfInterestId);
}

export const setCenterOfInterests = (userId: number, centerOfInterestIds: number[]): Promise<void> => {
    return userDal.setCenterOfInterests(userId, centerOfInterestIds);
}

export const getFriends = async (userId: number): Promise<UserOutput[]> => {
    try {
        // Utilisez la DAL pour obtenir la liste des amis
        const friends = await userDal.getFriends(userId);
        return friends;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get user friends');
    }
};

export const areFriends = async (userId: number, friendUserId: number): Promise<boolean> => {
    try {
        const areFriends = await userDal.areFriends(userId, friendUserId);
        return areFriends;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to check if users are friends');
    }
}

export const addFriend = async (userId: number, friendUserId: number, forceRelationType: friendRelationType = "pending"): Promise<void> => {
    try {
        await userDal.addFriend(userId, friendUserId, forceRelationType);
        await userDal.addActivity(userId, friendUserId, 'friendRequest');
    } catch (error) {
        console.error(error);
        throw new Error('Failed to add friend');
    }
};

export const removeFriend = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Utilisez la DAL pour supprimer l'ami
        await userDal.removeFriend(userId, friendUserId);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to remove friend');
    }
};

export const blockFriend = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Bloquez l'ami en mettant à jour l'entrée dans la table Friend
        await userDal.blockFriend(userId, friendUserId);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to block friend');
    }
};

export const unblockFriend = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Débloquez l'ami en mettant à jour l'entrée dans la table Friend
        await userDal.unblockFriend(userId, friendUserId);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to unblock friend');
    }
};

export const acceptFriendRequest = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Acceptez la demande d'ami en mettant à jour l'entrée dans la table Friend
        await userDal.acceptFriendRequest(userId, friendUserId);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to accept friend request');
    }
};

export const rejectFriendRequest = async (userId: number, friendUserId: number): Promise<void> => {
    try {
        // Rejetez la demande d'ami en supprimant l'entrée dans la table Friend
        await userDal.rejectFriendRequest(userId, friendUserId);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to reject friend request');
    }
};

export const getActivities = async (userId: number): Promise<Activity[]> => {
    try {
        return await userDal.getActivities(userId);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get user activity');
    }
}

export const getById = (id: number): Promise<UserOutput> => {
    return userDal.getById(id)
}

export const getByEmail = (email: string): Promise<UserOutput> => {
    return userDal.getByEmail(email)
}

export const deleteById = (id: number): Promise<boolean> => {
    return userDal.deleteById(id)
}
export const getAll = (filters: GetAllUsersFilters): Promise<UserOutput[]> => {
    return userDal.getAll(filters)
}
