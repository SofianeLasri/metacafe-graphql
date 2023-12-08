import {Router} from "express";
import passport from "passport";
import {CreateUserDTO} from "../dataTransferObjects/user.dto";
import * as userController from "../controllers/user";
import {jsonParser} from "../middlewares/authentication";
import { User } from "../interfaces";

const authRouter = Router();

authRouter.post('/login', jsonParser, passport.authenticate('local'), (req, res) => {
    // Cette fonction est appelée lorsque l'authentification réussit
    res.json({ user: req.user });
});

// Route de déconnexion
authRouter.post('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
        }
    });
    res.json({ message: 'Déconnexion réussie' });
});

authRouter.post('/register', jsonParser, async (req, res) => {
    let body = req.body;
    body.password = await userController.hashPassword(body.password);

    const payload:CreateUserDTO = req.body;
    try {
        const result: User = await userController.create(payload);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message: error});
    }
    return res;
});

export default authRouter;