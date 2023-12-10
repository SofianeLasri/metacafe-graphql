import {Attachment} from "../../interfaces";
import * as service from "../../services/attachmentService";
import * as mapper from './mapper'

export const getById = async (id: number): Promise<Attachment> => {
    return mapper.toAttachment(await service.getById(id));
}