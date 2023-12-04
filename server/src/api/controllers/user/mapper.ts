import {UserOutput} from "../../../db/models/User";
import {User} from "../../interfaces";

export const toUser = (user: UserOutput): User => {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
    }
}