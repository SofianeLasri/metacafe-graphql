export type CreateUserDTO = {
    name: string;
    email: string;
    password: string;
}

export type UpdateUserDTO = Required<CreateUserDTO>;

export type FilterUsersDTO = {
    isDeleted?: boolean;
    includeDeleted?: boolean;
}