export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture?: number | null;
    hasSeenIntro?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    validPassword(password: string): Boolean;
}