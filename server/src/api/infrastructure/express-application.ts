import {ExpressServer} from './express-server';
import * as dotenv from 'dotenv';
import dbInit from "../../db/inits";

export class ExpressApplication {
    private port!: string;
    private server!: ExpressServer;
    private sessionSecret!: string;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication(): void {
        this.configureEnvironment();
        this.configureEnvVariables();
        dbInit();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '../.env',
        });
    }

    private configureEnvVariables(): void {
        this.port = this.getPort();
        this.sessionSecret = ExpressApplication.getSessionSecret();
    }

    private configureServer(): void {
        this.server = new ExpressServer(this.port, this.sessionSecret);
    }

    private getPort(): string {
        const port = process.env.SERVER_PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }

        return port;
    }

    public static getSessionSecret(): string {
        const sessionSecret = process.env.SESSION_SECRET;
        if (!sessionSecret) {
            throw new Error('No session secret was found in env file.');
        }

        return sessionSecret;
    }

    public static getSessionDuration(): number {
        const sessionDuration = process.env.SESSION_DURATION;
        if (!sessionDuration) {
            throw new Error('No session duration was found in env file.');
        }

        return Number(sessionDuration);
    }
}
