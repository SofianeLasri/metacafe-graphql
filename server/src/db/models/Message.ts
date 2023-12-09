import {DataTypes, HasManyGetAssociationsMixin, Model, Optional} from "sequelize";
import sequelizeConnection from "../config";
import MessageAttachment from "./MessageAttachment";
import User from "./User";
import Attachment from "./Attachment";

interface MessageAttributes {
    id: number;
    senderUserId: number;
    receiverUserId: number;
    text: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface MessageInput extends Optional<MessageAttributes, 'id'> {
}

export interface MessageOutput extends Required<MessageAttributes> {
}

class Message extends Model<MessageAttributes, MessageInput> implements MessageAttributes {
    public id!: number;
    public senderUserId!: number;
    public receiverUserId!: number;
    public text!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public getMessageAttachments!: HasManyGetAssociationsMixin<MessageAttachment>;
}

Message.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    senderUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    receiverUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'messages',
    sequelize: sequelizeConnection,
    paranoid: true,
});

export default Message;