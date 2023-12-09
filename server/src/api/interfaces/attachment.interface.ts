export interface Attachment {
    id: number;
    userId: number;
    name: string;
    path: string;
    mimeType: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}