import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.Cohere_API_KEY) {
    throw new Error("GROQ_API_KEY not provided");
}

export const cohere = new CohereClientV2({
    token: process.env.Cohere_API_KEY
})