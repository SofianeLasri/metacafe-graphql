import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import User from "./User";
import Attachment from "./Attachment";

interface StoryAttributes {
    id: number;
    userId: number;
    text: string;
    imageId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface StoryInput extends Optional<StoryAttributes, 'id'> {}
export interface StoryOutput extends Required<StoryAttributes> {}

class Story extends Model<StoryAttributes, StoryInput> implements StoryAttributes {
    public id!: number;
    public userId!: number;
    public text!: string;
    public imageId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;


}

Story.init({
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
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    imageId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: Attachment,
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'stories',
    sequelize: sequelizeConnection,
    paranoid: true,
});

export default Story;