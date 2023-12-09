import {Sequelize} from "sequelize-typescript";
import * as dotenv from 'dotenv';

dotenv.config({
    path: '../.env',
});

const dbName: string = process.env.MYSQL_DATABASE as string;
const dbUser: string = process.env.MYSQL_USER as string;
const dbPassword: string = process.env.MYSQL_PASSWORD as string;
const dbHost: string = process.env.MYSQL_HOST as string;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mariadb',
});

export default sequelizeConnection;