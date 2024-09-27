import { Server } from "./server";

new Server()
    .initMiddleWares()
    .initRoutes()
    .start();