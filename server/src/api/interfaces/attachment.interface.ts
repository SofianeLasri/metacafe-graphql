export interface Attachment {
    id: number;
    userId: number;
    name: string;
    size: number;
    path: string;
    mimeType: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}