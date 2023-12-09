import {NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import {User} from "../interfaces";
import {ExpressApplication} from "./express-application";

export const jsonParser = bodyParser.json();

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
        return res.status(401).json({message: 'Non authentifié'});
    }

    const jwtToken = token.replace("Bearer ", "");

    jwt.verify(jwtToken, ExpressApplication.getSessionSecret(), (err, verified) => {
        if (err) {
            return res.status(401).json({message: 'Non authentifié'});
        }
        req.user = verified;
        next();
    });
}

export const generateAuthToken = (user: User) => {
    const secretKey: string = ExpressApplication.getSessionSecret();
    const sessionDuration: number = ExpressApplication.getSessionDuration();

    return jwt.sign({email: user.email}, secretKey, {
        expiresIn: sessionDuration,
    });
}