import {Attachment} from "./attachment.interface";

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture?: Attachment | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    validPassword(password: string): Boolean;
}