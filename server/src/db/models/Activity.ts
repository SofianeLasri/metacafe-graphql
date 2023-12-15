import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import User from "./User";

export type activityType = "friendRequest" | "sendMessage";

interface ActivityAttributes {
    id: number;
    userId: number;
    targetUserId: number;
    type: activityType;
    isNew: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface ActivityInput extends Optional<ActivityAttributes, 'id'> {}
export interface ActivityOutput extends Required<ActivityAttributes> {}

class Activity extends Model<ActivityAttributes, ActivityInput> implements ActivityAttributes {
    public id!: number;
    public userId!: number;
    public targetUserId!: number;
    public type!: activityType;
    public isNew!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Activity.init({
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
    targetUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    type: {
        type: DataTypes.ENUM('friendRequest', 'sendMessage'),
        allowNull: false,
    },
    isNew: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    timestamps: true,
    tableName: 'activities',
    sequelize: sequelizeConnection,
    paranoid: true,
});

export default Activity;
