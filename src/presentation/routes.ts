import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {

    static get routes(): Router {
        const router = Router();

        router.use('/api/v1/auth', AuthRoutes.routes);
        /*
        router.use('/api/v1/user', AuthRoutes);
        router.use('/api/v1/products', AuthRoutes);
        router.use('/api/v1/clients', AuthRoutes);
        router.use('/api/v1/orders', AuthRoutes);
        */
        return router;
    }
}