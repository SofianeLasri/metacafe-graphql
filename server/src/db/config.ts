import {Sequelize} from "sequelize-typescript";
import * as dotenv from 'dotenv';

dotenv.config({
    path: '../.env',
});

const dbName = process.env.MYSQL_DATABASE as string;
const dbUser = process.env.MYSQL_USER as string;
const dbPassword = process.env.MYSQL_PASSWORD;
const dbHost = process.env.MYSQL_HOST;

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mariadb',
});

export default sequelizeConnection;