import * as service from "../../services/userService";
import {CreateUserDTO, FilterUsersDTO, UpdateUserDTO} from "../../dataTransferObjects/user.dto";
import * as mapper from './mapper'
import {User} from "../../interfaces";
import exp from "node:constants";

export const create = async(payload: CreateUserDTO): Promise<User> => {
    return mapper.toUser(await service.create(payload));
}

export const update = async(id: number, payload: UpdateUserDTO): Promise<User> => {
    return mapper.toUser(await service.update(id, payload));
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

export const hashPassword = async(password: string): Promise<string> => {
    return await service.hashPassword(password);
}