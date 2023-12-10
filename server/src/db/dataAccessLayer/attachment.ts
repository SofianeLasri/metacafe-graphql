import Attachment, {AttachmentInput, AttachmentOutput} from "../models/Attachment";
import {GetAllAttachmentsFilters} from "./types";
import {Op} from "sequelize";
import sharp from 'sharp';
import fs from 'fs/promises';

export const create = async (userId: number, file: Express.Multer.File): Promise<AttachmentOutput> => {
    try {
        const compressedImageBuffer: Buffer = await sharp(file.path)
            .resize({width: 512, height: 512})
            .avif({quality: 80})
            .toBuffer();

        const compressedImagePath: string = `${file.path.split('.')[0]}.avif`;
        await fs.writeFile(compressedImagePath, compressedImageBuffer);

        const attachment: Attachment = await Attachment.create({
            userId: userId,
            name: `${file.originalname}`,
            size: compressedImageBuffer.length,
            path: compressedImagePath,
            mimeType: 'image/avif',
        });

        await fs.unlink(file.path);

        return attachment;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to create and compress attachment');
    }
};

export const update = async (id: number, payload: Partial<AttachmentInput>): Promise<AttachmentOutput> => {
    const attachment: Attachment | null = await Attachment.findByPk(id);
    if (!attachment) throw new Error('Attachment not found');
    return await attachment.update(payload);
}

export const getById = async (id: number): Promise<AttachmentOutput> => {
    const attachment: Attachment | null = await Attachment.findByPk(id);
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