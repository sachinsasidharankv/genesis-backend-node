import * as dotenv from 'dotenv';
import { Server } from "./server";

dotenv.config();

new Server()
    .initMiddleWares()
    .initRoutes()
    .start();