import {DataTypes, Model, Optional} from "sequelize";
import sequelizeConnection from "../config";
import Message from "./Message";
import Attachment from "./Attachment";

interface MessageAttachmentAttributes {
    id: number;
    messageId: number;
    attachmentId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface MessageAttachmentInput extends Optional<MessageAttachmentAttributes, 'id'> {
}

export interface MessageAttachmentOutput extends Required<MessageAttachmentAttributes> {
}

class MessageAttachment extends Model<MessageAttachmentAttributes, MessageAttachmentInput> implements MessageAttachmentAttributes {
    public id!: number;
    public messageId!: number;
    public attachmentId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

MessageAttachment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    messageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Message,
            key: 'id',
        },
    },
    attachmentId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Attachment,
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'message_attachment',
    sequelize: sequelizeConnection,
    paranoid: true
});

MessageAttachment.belongsTo(Message, {
    foreignKey: 'messageId',
});

Message.hasMany(MessageAttachment, {
    foreignKey: 'messageId',
    as: 'attachments', // nom optionnel pour l'alias de l'association
});

export default MessageAttachment;