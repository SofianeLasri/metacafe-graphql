export type emojiDataByGroup = {
    [key: string]: {
        "emoji": string;
        "skin_tone_support": boolean;
        "name": string;
        "slug": string;
        "unicode_version": number;
        "emoji_version": number;
    }
}

export type userPublicProfile = {
    id: number;
    name: string;
    profilePicture?: number | null;
    status: string;
};

export type Attachment = {
    id: number;
    name: string;
    url: string;
}

export type Sender = "me" | "friend";