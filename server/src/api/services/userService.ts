import * as userDal from "../../db/dataAccessLayer/user";
import {UserInput, UserOutput} from "../../db/models/User";
import {GetAllUsersFilters} from "../../db/dataAccessLayer/types";

export const create = (payload: UserInput): Promise<UserOutput> => {
    return userDal.create(payload);
}

export const update = (id: number, payload: Partial<UserInput>): Promise<UserOutput> => {
    return userDal.update(id, payload);
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
