import {DataTypes, Model, Optional, HasManyGetAssociationsMixin, BelongsToManyGetAssociationsMixin} from "sequelize";
import sequelizeConnection from "../config";
import bcrypt from 'bcrypt';
import Friend from "./Friend";
import Story from "./Story";
import Message from "./Message";
import CenterOfInterest from "./CenterOfInterest";

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    profilePicture?: number | null;
    hasSeenIntro?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;

    getFriends?: HasManyGetAssociationsMixin<Friend>;
    getStories?: HasManyGetAssociationsMixin<Story>;
    getSentMessages?: HasManyGetAssociationsMixin<Message>;
    getReceivedMessages?: HasManyGetAssociationsMixin<Message>;
    getCenterOfInterests?: BelongsToManyGetAssociationsMixin<CenterOfInterest>;
    addCenterOfInterest?: (centerOfInterest: CenterOfInterest) => Promise<void>;
    removeCenterOfInterests?: (centerOfInterest: CenterOfInterest[]) => Promise<void>;
}

export interface UserInput extends Optional<UserAttributes, 'id'> {
}

export interface UserOutput extends Required<UserAttributes> {
}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public profilePicture!: number | null;

    public hasSeenIntro!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public validPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    declare getFriends: HasManyGetAssociationsMixin<Friend>;
    declare getStories: HasManyGetAssociationsMixin<Story>;
    declare getSentMessages: HasManyGetAssociationsMixin<Message>;
    declare getReceivedMessages: HasManyGetAssociationsMixin<Message>;
    declare getCenterOfInterests: BelongsToManyGetAssociationsMixin<CenterOfInterest>
    declare addCenterOfInterest: (centerOfInterest: CenterOfInterest) => Promise<void>;
    declare removeCenterOfInterests: (centerOfInterest: CenterOfInterest[]) => Promise<void>;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
        set(value: string) {
            const hash = bcrypt.hashSync(value, 10);
            this.setDataValue('password', hash);
        },
    },
    profilePicture: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
    },
    hasSeenIntro: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
}, {
    timestamps: true,
    tableName: 'users',
    sequelize: sequelizeConnection,
    paranoid: true
});

Story.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

User.hasMany(Message, {
    foreignKey: 'senderUserId',
    as: 'sentMessages',
});

Message.belongsTo(User, {
    foreignKey: 'senderUserId',
    as: 'sender',
});

User.hasMany(Message, {
    foreignKey: 'receiverUserId',
    as: 'receivedMessages',
});

Message.belongsTo(User, {
    foreignKey: 'receiverUserId',
    as: 'receiver',
});

export default User;