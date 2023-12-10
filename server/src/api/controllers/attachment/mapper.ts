import {Attachment} from "../../interfaces";
import {AttachmentOutput} from "../../../db/models/Attachment";

export const toAttachment = (attachment: AttachmentOutput): Attachment => {
    return {
        id: attachment.id,
        userId: attachment.userId,
        name: attachment.name,
        size: attachment.size,
        path: attachment.path,
        mimeType: attachment.mimeType,
        createdAt: attachment.createdAt,
        updatedAt: attachment.updatedAt,
        deletedAt: attachment.deletedAt,
    }
}