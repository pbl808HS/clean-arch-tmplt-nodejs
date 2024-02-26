import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";

export class AuthRoutes {

    static get routes(): Router {
        const router = Router();

        const datasource = new AuthDatasourceImpl();
        const authRepository = new AuthRepositoryImpl(datasource);
        const controller = new AuthController(authRepository);

        router.use('/login', controller.loginUser);
        router.use('/register', controller.registerUser);
        router.use('/logout', controller.logoutUser);
        return router;
    }
}