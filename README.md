
To starting the dev project:

Requisites:
    - Docker
    - Mongodb image
    - Git bash
    - Typescrypt
    - Nodejs v20
    - Vs Code

run the commands in your terminal for mac os or linux or git bash in windows -> `npm install` and `npm run dev`

Start mongo db database: `docker compose up -d`

To build project:
run the command `npm run build`

To start in a node server:
run the command `npm run start`

To generate the JWT_SEED run the command: `openssl rand -hex 32` or `openssl rand -base64 12`