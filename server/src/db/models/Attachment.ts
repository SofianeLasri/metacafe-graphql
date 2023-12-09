import {DataTypes, HasManyGetAssociationsMixin, Model, Optional} from "sequelize";
import sequelizeConnection from "../config";
import MessageAttachment from "./MessageAttachment";
import User from "./User";
import Story from "./Story";


interface AttachmentAttributes {
    id: number;
    userId: number;
    name: string;
    path: string;
    mimeType: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AttachmentInput extends Optional<AttachmentAttributes, 'id'> {}
export interface AttachmentOutput extends Required<AttachmentAttributes> {}

class Attachment extends Model<AttachmentAttributes, AttachmentInput> implements AttachmentAttributes{
    public id!: number;
    public userId!: number;
    public name!: string;
    public path!: string;
    public mimeType!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public getMessageAttachments!: HasManyGetAssociationsMixin<MessageAttachment>;
    public getStories!: HasManyGetAssociationsMixin<Story>;
}

Attachment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    mimeType: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'attachments',
    sequelize: sequelizeConnection,
    paranoid: true
});

Attachment.hasMany(Story, {
    foreignKey: 'imageId',
    as: 'stories', // nom optionnel pour l'alias de l'association
});

Story.belongsTo(Attachment, {
    foreignKey: 'imageId',
    as: 'image',
});

export default Attachment;