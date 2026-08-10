import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/user.auth.route.js";
import { contentsRouter } from "./routes/contents.route.js";
import { chatRouter } from "./routes/chat.route.js";
import { aiRouter } from "./routes/ai.route.js";

const app = express();

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contents", contentsRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/ai", aiRouter)


const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("SERVER RUNNING")
    });
}

start();