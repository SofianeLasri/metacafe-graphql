import Attachment, {AttachmentInput, AttachmentOutput} from "../models/Attachment";
import {GetAllAttachmentsFilters} from "./types";
import {Op} from "sequelize";

export const create = async (payload: AttachmentInput): Promise<AttachmentOutput> => {
    return await Attachment.create(payload);
}

export const update = async (id:number, payload: Partial<AttachmentInput>): Promise<AttachmentOutput> => {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) throw new Error('Attachment not found');
    return await attachment.update(payload);
}

export const getById = async (id: number): Promise<AttachmentOutput> => {
    const attachment = await Attachment.findByPk(id);
    if (!attachment) throw new Error('Attachment not found');
    return attachment;
}

export const deleteById = async (id: number): Promise<boolean> => {
    const deletedAttachmentCount = await Attachment.destroy({
        where: {
            id,
        },
    });
    return !!deletedAttachmentCount;
}

export const getAll = async (filters?: GetAllAttachmentsFilters): Promise<AttachmentOutput[]> => {
    const queryOptions: any = {
        where: {},
    };

    if (filters) {
        if (filters.isDeleted) {
            queryOptions.where.deletedAt = {[Op.not]: null};
        }

        if (filters.isDeleted || filters.includeDeleted) {
            queryOptions.paranoid = true;
        }
    }

    return Attachment.findAll(queryOptions);
}