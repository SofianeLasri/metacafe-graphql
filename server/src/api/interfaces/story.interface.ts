export interface Story {
    id: number;
    userId: number;
    text: string;
    imageId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}