import { Request, Response } from "express";
export class AuthController {

    loginUser = (req: Request, res: Response) => {
        res.json(req.body)
    }
    registerUser = (req: Request, res: Response) => { res.json(req.body) }
    logoutUser = (req: Request, res: Response) => { res.json('logoutUser controller') }
}