import { Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";

export const jsonParser = bodyParser.json();

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Non authentifié' });
}