import * as attachmentDal from "../../db/dataAccessLayer/attachment";
import {AttachmentOutput} from "../../db/models/Attachment";

export const getById = (id: number): Promise<AttachmentOutput> => {
    return attachmentDal.getById(id);
}