import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import User from "./User";
import Story from "./Story";

interface FriendAttributes {
    id: number;
    userId: number;
    friendUserId: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface FriendInput extends Optional<FriendAttributes, 'id'> {}
export interface FriendOutput extends Required<FriendAttributes> {}

class Friend extends Model<FriendAttributes, FriendInput> implements FriendAttributes {
    public id!: number;
    public userId!: number;
    public friendUserId!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Friend.init({
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
    friendUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true,
    tableName: 'friends',
    sequelize: sequelizeConnection,
    paranoid: true
});

User.hasMany(Friend, {
    foreignKey: 'userId',
    as: 'friends',
});

Friend.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Story, {
    foreignKey: 'userId',
    as: 'stories',
});

export default Friend;