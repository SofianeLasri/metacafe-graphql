export interface Activity {
    id: number;
    userId: number;
    targetUserId: number;
    type: "friendRequest" | "sendMessage";
    isNew: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}