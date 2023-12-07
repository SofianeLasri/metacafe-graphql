import {Router} from "express";
import passport from "passport";

const authRouter = Router();

authRouter.post('/login', passport.authenticate('local'), (req, res) => {
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

export default authRouter;