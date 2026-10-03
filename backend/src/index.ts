import express, { type NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import { userRouter } from "./routes/user.auth.route.js";
import { contentsRouter } from "./routes/contents.route.js";
import { chatRouter } from "./routes/chat.route.js";
import { brainRouter } from "./routes/brain.routes.js";
import { quizRouter } from "./routes/quiz.routes.js";
import uploadRouter from "./routes/fileUpload.route.js"

import cors from "cors";
import { ApiError } from "./utils/ApiError.js";
import helmet from "helmet";
import { errorHandler } from "./services/errorHandler.js";


const app = express();

app.use(cors({
    origin: (origin, callback) => {
        const allowed = [
            "http://localhost:5173",
            "https://olter-mrvg.vercel.app",
        ];

        if (!origin || allowed.includes(origin) || origin.endsWith(".vercel.app")) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(helmet());
app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/contents", contentsRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/brain", brainRouter);
app.use("/api/v1/quiz", quizRouter);

app.use(express.urlencoded({ extended: false }))
app.use('/file', uploadRouter)

app.use(errorHandler)


const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log("SERVER RUNNING")
    });
}

start();