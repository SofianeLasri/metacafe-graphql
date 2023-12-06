import {DataTypes, Model, Optional} from "sequelize";
import sequelizeConnection from "../config";

interface AttachmentAttributes {
    id: number;
    name: string;
    path: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface AttachmentInput extends Optional<AttachmentAttributes, 'id'> {}
export interface AttachmentOutput extends Required<AttachmentAttributes> {}

class Attachment extends Model<AttachmentAttributes, AttachmentInput> implements AttachmentAttributes{
    public id!: number;
    public name!: string;
    public path!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Attachment.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'attachments',
    sequelize: sequelizeConnection,
    paranoid: true
});

export default Attachment;