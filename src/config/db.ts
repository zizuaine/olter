import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
    const mongoUrl = process.env.MONGO_URL;

    if (!mongoUrl) {
        throw new Error("Mongo Url is not defined")
    }

    try {
        await mongoose.connect(mongoUrl);
        console.log("database is connected")
    } catch (error) {
        if (error instanceof Error)
            console.error(error.message);
    }
}