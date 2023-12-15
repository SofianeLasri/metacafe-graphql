import {Request, Response} from 'express';
import * as service from "../../services/userService";
import {CreateUserDTO, FilterUsersDTO, UpdateUserDTO} from "../../dataTransferObjects/user.dto";
import * as mapper from './mapper';
import * as centerOfInterestMapper from '../centerOfInterest/mapper';
import {CenterOfInterest, User} from "../../interfaces";
import {UserOutput, userPublicProfile} from "../../../db/models/User";
import {Activity} from "../../../db/models";

export const create = async (payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload));
}

export const update = async (id: number, payload: UpdateUserDTO): Promise<User> => {
    return mapper.toUser(await service.update(id, payload));
}

export const updateProfilePicture = async (id: number, profilePicture: Express.Multer.File): Promise<User> => {
    return mapper.toUser(await service.updateProfilePicture(id, profilePicture));
};

export const getCentersOfInterest = async (id: number): Promise<CenterOfInterest[]> => {
    return await service.getCentersOfInterest(id)
}

export const addCenterOfInterest = async (userId: number, centerOfInterestId: number): Promise<void> => {
    await service.addCenterOfInterest(userId, centerOfInterestId);
}

export const setCenterOfInterests = async (userId: number, centerOfInterestIds: number[]): Promise<void> => {
    await service.setCenterOfInterests(userId, centerOfInterestIds);
}

export const getFriends = async (req: Request, res: Response) => {
    try {
        const user: User = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friends: UserOutput[] = await service.getFriends(user.id);
        const friendsPublicProfiles: userPublicProfile[] = friends.map(friend => {
            return {
                id: friend.id,
                name: friend.name,
                profilePicture: friend.profilePicture,
                status: "En ligne", // TODO: Implémenter le statut
            }
        });
        res.status(200).json(friendsPublicProfiles);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friendUserId = req.body.friendUserId; // Supposons que le client envoie l'ID de l'utilisateur à ajouter dans le corps de la requête

        // Vérifiez si les utilisateurs ne sont pas déjà amis
        const areFriends = await service.areFriends(user.id, friendUserId);
        if (areFriends) {
            return res.status(400).json({error: 'Users are already friends.'});
        }

        // Faites la demande d'ami
        await service.addFriend(user.id, friendUserId);

        res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const user: User = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friendUserId = req.body.friendUserId; // Supposons que le client envoie l'ID de l'utilisateur à supprimer dans le corps de la requête

        // Vérifiez si les utilisateurs sont amis
        const areFriends = await service.areFriends(user.id, friendUserId);
        if (!areFriends) {
            return res.status(400).json({error: 'Users are not friends.'});
        }

        // Supprimez l'ami
        await service.removeFriend(user.id, friendUserId);

        res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const blockFriend = async (req: Request, res: Response) => {
    try {
        const user: User = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friendUserId = req.body.friendUserId; // Supposons que le client envoie l'ID de l'utilisateur à bloquer dans le corps de la requête

        // Bloquez l'utilisateur
        await service.blockFriend(user.id, friendUserId);

        res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const unblockFriend = async (req: Request, res: Response) => {
    try {
        const user: User = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friendUserId = req.body.friendUserId; // Supposons que le client envoie l'ID de l'utilisateur à débloquer dans le corps de la requête

        // Débloquez l'utilisateur
        await service.unblockFriend(user.id, friendUserId);

        res.status(200).json({success: true});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        const user = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friendUserId = req.body.friendUserId; // Supposons que le client envoie l'ID de l'utilisateur à accepter comme ami dans le corps de la requête

        // Acceptez la demande d'ami
        await service.acceptFriendRequest(user.id, friendUserId);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const rejectFriendRequest = async (req: Request, res: Response) => {
    try {
        const user = req.user as User; // Supposons que vous avez un objet User dans la requête après l'authentification
        const friendUserId = req.body.friendUserId; // Supposons que le client envoie l'ID de l'utilisateur à rejeter comme ami dans le corps de la requête

        // Rejetez la demande d'ami
        await service.rejectFriendRequest(user.id, friendUserId);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getById = async (id: number): Promise<User> => {
    return mapper.toUser(await service.getById(id));
}

export const getPublicProfileById = async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id);
        const user: UserOutput = await service.getById(id);
        const userPublicProfile: userPublicProfile = {
            id: user.id,
            name: user.name,
            profilePicture: user.profilePicture,
            status: "En ligne", // TODO: Implémenter le statut
        };
        res.status(200).json(userPublicProfile);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getActivities = async (req: Request, res: Response) => {
    try {
        const user: User = req.user as User;
        const activities: Activity[] = await service.getActivities(user.id);
        res.status(200).json(activities);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

export const getByEmail = async (email: string): Promise<User> => {
    return mapper.toUser(await service.getByEmail(email));
}

export const deleteById = async (id: number): Promise<boolean> => {
    return await service.deleteById(id);
}

export const getAll = async (filters: FilterUsersDTO): Promise<User[]> => {
    return (await service.getAll(filters)).map(mapper.toUser);
}
