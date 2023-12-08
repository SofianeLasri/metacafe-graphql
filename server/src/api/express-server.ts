import cors from 'cors';
import express, {Express} from 'express';
import routes from "./routes";
import session from 'express-session';
import passport from "passport";
import {Strategy as LocalStrategy} from 'passport-local';
import User from "../db/models/User";

export class ExpressServer {
    private express: Express = express();
    private readonly port: string;
    private readonly secret: string;

    constructor(
        port: string,
        secret: string,
    ) {
        this.port = port;
        this.secret = secret;
        this.configureMiddlewares();
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

    private configureMiddlewares(): void {
        const allowedOrigins = ['http://localhost:5173'];

        const options: cors.CorsOptions = {
            origin: allowedOrigins
        };

        this.express.use(cors(options));

        this.express.use(session({
            secret: this.secret,
            resave: false,
            saveUninitialized: false,
        }));

        this.express.use(passport.initialize());
        this.express.use(passport.session());

        passport.use(new LocalStrategy(
            {
                usernameField: 'email', // Utilise l'email comme nom d'utilisateur
                passwordField: 'password',
            },
            async (email: string, password: string, done): Promise<void> => {
                try {
                    const user = await User.findOne({ where: { email } });

                    // Vérifie si l'utilisateur existe et si le mot de passe est correct
                    if (!user || !user.validPassword(password)) {
                        return done(null, false, {message: 'Nom d\'utilisateur ou mot de passe incorrect'});
                    }

                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        ));

        passport.serializeUser<any, any>((user, done: any) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id: number, done): Promise<void> => {
            try {
                const user = await User.findByPk(id);
                done(null, user);
            } catch (error) {
                done(error);
            }
        });
    }
}
