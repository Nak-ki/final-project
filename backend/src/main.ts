/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import express, {NextFunction, Request, Response} from "express";
import cors from "cors";

import { config } from "./configs/configs";
import { ApiError } from "./errors/api.error";
import mongoose from "mongoose";

import { apiRouter } from "./routers/api.router";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/", apiRouter);

app.use(
    "/{*splat}",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
        const status = err.status || 500;
        const message = err.message ?? "Something went wrong";
        res.status(status).json({ status, message });
    },
);
process.on("uncaughtException", (err) => {
    console.log("uncaughtException", err);
    process.exit(1);
});
const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log("Connecting to DB...");
            console.log(config.MONGO_URI);
            console.log(process.env.MONGO_URI);
            await mongoose.connect(config.MONGO_URI);
            dbCon = true;
            console.log("Database available!!!");
        } catch (e) {
            console.log("Database unavailable, wait 3 seconds");
            await new Promise((resolve) => setTimeout(resolve, 3000));
        }
    }
};

const start = async () => {
    try {
        await dbConnection();
        app.listen(config.PORT, () => {
            console.log(`Server listening on ${config.FRONT_URL}`);
        });
    } catch (e) {
        console.log(e);
    }
};

start();