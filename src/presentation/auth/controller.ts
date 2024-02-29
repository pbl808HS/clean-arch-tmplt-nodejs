import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto, RegisterUserUseCase, LoginUserDto, LoginUserUseCase } from "../../domain";
import { UserModel } from "../../data/mongodb";

export class AuthController {
    constructor(
        private readonly authRepository: AuthRepository
    ) {}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError ) {
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(error);
        return res.status(500).json({error: 'Internal server error'});
    }

    registerUser = (req: Request, res: Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);

        if (error) return res.status(400).json({error});

        new RegisterUserUseCase(this.authRepository)
        .excecute(registerUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
    }

    loginUser = (req: Request, res: Response) => {
        const [error, loginUserDto] = LoginUserDto.login(req.body);

        if (error) return res.status(400).json({error});

        new LoginUserUseCase(this.authRepository)
        .excecute(loginUserDto!)
        .then(data => res.json(data))
        .catch(error => this.handleError(error, res));
        //res.json(req.body)
    }

    getUsers = (req: Request, res: Response) => {
        UserModel.find()
        .then(users => res.json({
            //payload: req.body.payload
            user: req.body.user
            //token: req.body.token
        }))
        .catch(() => res.status(500).json({error: 'Internal server error'}));
    }

    logoutUser = (req: Request, res: Response) => {
        res.json('logoutUser controller')
    }
}