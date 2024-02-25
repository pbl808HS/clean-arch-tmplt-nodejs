import { Request, Response } from "express";
export class AuthController {

    loginUser = (req: Request, res: Response) => {
        res.json('loginUser controller')
    }
    registerUser = (req: Request, res: Response) => { res.json('registerUser controller') }
    logoutUser = (req: Request, res: Response) => { res.json('logoutUser controller') }
}