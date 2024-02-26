import express, { Router } from 'express';

interface Options {
    port?: number,
    routes: Router
}

    // nuestras clases deben estar abiertas a su expancion pero cerradas a su modificacion
export class Server {
    public readonly app = express();
    private readonly port: number;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port = 3100, routes } = options;
        this.port = port;
        this.routes = routes;
    }

    async start() {
        // middlewares
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded
        // usar las rutas definidas
        this.app.use(this.routes);
        // escuchar el puerto
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}