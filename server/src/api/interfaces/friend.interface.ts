export interface Friend {
    id: number;
    userId: number;
    friendUserId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}