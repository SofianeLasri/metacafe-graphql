export interface Message {
    id: number;
    senderUserId: number;
    receiverUserId: number;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}