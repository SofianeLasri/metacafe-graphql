import { DataTypes, Model, Optional, BelongsToManyGetAssociationsMixin } from "sequelize";
import sequelizeConnection from "../config";
import User from "./User";

// Modèle pour les centres d'intérêt
interface CenterOfInterestAttributes {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface CenterOfInterestInput extends Optional<CenterOfInterestAttributes, 'id'> {}
export interface CenterOfInterestOutput extends Required<CenterOfInterestAttributes> {}

class CenterOfInterest extends Model<CenterOfInterestAttributes, CenterOfInterestInput> implements CenterOfInterestAttributes {
    public id!: number;
    public name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;

    public getUsers!: BelongsToManyGetAssociationsMixin<User>;
}

CenterOfInterest.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'centers_of_interest',
    sequelize: sequelizeConnection,
    paranoid: true,
});

// Table de jointure entre User et CenterOfInterest
User.belongsToMany(CenterOfInterest, {
    through: 'user_center_of_interest',
    foreignKey: 'userId',
});

CenterOfInterest.belongsToMany(User, {
    through: 'user_center_of_interest',
    foreignKey: 'centerOfInterestId',
    as: 'users',
});

export default CenterOfInterest;