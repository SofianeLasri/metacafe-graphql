import {Router} from "express";
import passport from "passport";
import {CreateUserDTO} from "../dataTransferObjects/user.dto";
import * as userController from "../controllers/user";
import {User} from "../interfaces";
import {generateAuthToken, isAuthenticated, jsonParser} from "../infrastructure/authentication";

const authRouter = Router();

authRouter.post('/login', jsonParser, (req, res) => {
    if (req.body.email === 'no-reply@metacafe.com') {
        return res.status(401).json({message: 'Vous ne pouvez pas vous connecter avec ce compte'});
    }

    passport.authenticate('local', (err: any, user: User, info: any) => {
        if (err) {
            return res.status(500).json({message: err});
        }
        if (!user) {
            return res.status(401).json({message: info.message});
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({message: err});
            }
        });
        console.log('login');

        const token: string = generateAuthToken(user);
        res.status(200).json({token: token});
    })(req, res);
});

// Route de déconnexion
authRouter.post('/logout', isAuthenticated, (req, res) => {
    req.logout(function (err) {
        if (err) {
            return res.status(500).json({message: 'Erreur lors de la déconnexion'});
        }
    });
    res.json({message: 'Déconnexion réussie'});
});

authRouter.post('/register', jsonParser, async (req, res) => {
    let body = req.body;
    if (!body.name || !body.email || !body.password || body.name === '' || body.email === '' || body.password === '') {
        return res.status(400).send({message: 'Missing parameters'});
    }

    const payload: CreateUserDTO = req.body;
    try {
        const result: User = await userController.create(payload);
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({message: error});
    }
    return res;
});

export default authRouter;