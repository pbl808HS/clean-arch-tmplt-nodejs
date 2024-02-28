import { NextFunction, Request, Response } from "express";

export class AuthMiddleware {

    static validateJwt = (req: Request, res: Response, next:NextFunction) => {
        console.log('Middleware used');
        next();
    }
}