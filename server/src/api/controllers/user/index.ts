import * as service from "../../services/userService";
import {CreateUserDTO, FilterUsersDTO, UpdateUserDTO} from "../../dataTransferObjects/user.dto";
import * as mapper from './mapper';
import * as centerOfInterestMapper from '../centerOfInterest/mapper';
import {CenterOfInterest, User} from "../../interfaces";

export const create = async(payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload));
}

export const update = async(id: number, payload: UpdateUserDTO): Promise<User> => {
    return mapper.toUser(await service.update(id, payload));
}

export const updateProfilePicture = async (id: number, profilePicture: Express.Multer.File): Promise<User> => {
    return mapper.toUser(await service.updateProfilePicture(id, profilePicture));
};

export const getCentersOfInterest = async(id: number): Promise<CenterOfInterest[]> => {
    return await service.getCentersOfInterest(id)
}

export const addCenterOfInterest = async(userId: number, centerOfInterestId: number): Promise<void> => {
    await service.addCenterOfInterest(userId, centerOfInterestId);
}

export const setCenterOfInterests = async(userId: number, centerOfInterestIds: number[]): Promise<void> => {
    await service.setCenterOfInterests(userId, centerOfInterestIds);
}

export const getById = async(id: number): Promise<User> => {
    return mapper.toUser(await service.getById(id));
}

export const getByEmail = async(email: string): Promise<User> => {
    return mapper.toUser(await service.getByEmail(email));
}

export const deleteById = async(id: number): Promise<boolean> => {
    return await service.deleteById(id);
}

export const getAll = async(filters: FilterUsersDTO): Promise<User[]> => {
    return (await service.getAll(filters)).map(mapper.toUser);
}
