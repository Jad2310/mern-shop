import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { productRoutes, userRoutes } from "./routes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import connectDB from "./config/db";
import { IUser } from "./models/userModel";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser;
        }
    }
}

import "colors";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: ["http://localhost:3000"],
    })
);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`.yellow.bold);
});
