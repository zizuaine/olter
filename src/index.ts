import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/user.auth.route.js";
import { contentsRouter } from "./routes/contents.route.js";
import { searchRouter } from "./routes/search.route.js";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contents", contentsRouter);
app.use("/api/v1/search", searchRouter)


const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("SERVER RUNNING")
    });
}

start();