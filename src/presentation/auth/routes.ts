import { Router } from "express";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/login', (req, res) => {
            res.json('Login')
        });
        router.use('/register', (req, res) => {
            res.json('Register')
        });
        router.use('/logout', (req, res) => {
            res.json('Logout')
        });
        return router;
    }
}