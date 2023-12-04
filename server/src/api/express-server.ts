import express from 'express';
import routes from "./routes";

export class ExpressServer {
    private express = express();

    constructor(
        private port: string,
    ) {
        this.configureRoutes();
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }

    private configureRoutes(): void {
        this.express.use('/api', routes);
    }
}
