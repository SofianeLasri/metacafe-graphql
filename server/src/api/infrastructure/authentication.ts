import {NextFunction, Request, Response} from 'express';
import bodyParser from "body-parser";
import jwt from 'jsonwebtoken';
import {User} from "../interfaces";
import {ExpressApplication} from "./express-application";

export const jsonParser = bodyParser.json();

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({message: 'Non authentifié'});
}

export const generateAuthToken = (user: User) => {
    const secretKey: string = ExpressApplication.getSessionSecret();
    const sessionDuration: number = ExpressApplication.getSessionDuration();

    return jwt.sign({email: user.email}, secretKey, {
        expiresIn: sessionDuration,
    });
}