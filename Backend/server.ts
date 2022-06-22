import express from "express";
import dotenv from "dotenv";
import { productRoutes } from "./routes";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import connectDB from "./config/db";

import "colors";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`.yellow.bold);
});
