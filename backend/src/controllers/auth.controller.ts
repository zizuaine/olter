import type { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";
import { ApiError } from "../utils/ApiError.js";

const validateUser = z.object({
    email: z.string().min(3).email(),
    username: z.string().min(3).max(13),
    password: z.string().min(3).regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password is too weak"
    ),
    firstName: z.string().min(3).max(30),
    lastName: z.string().min(3).max(30),
})

type userBody = z.infer<typeof validateUser>

export const getJwtSecret = (): string => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new ApiError(500, "CONFIGURATION_ERROR", "JWT secret is missing");
    }
    return secret;
}

export const signUp = async (req: Request<{}, {}, userBody>, res: Response) => {

    const result = validateUser.safeParse(req.body);

    if (!result.success) {
        throw result.error;
    }

    const { email, username, password, firstName, lastName } = result.data;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "USER_EXISTS", "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
        email,
        username,
        password: hashedPassword,
        firstName,
        lastName
    });
    return res.status(201).json({
        message: "sign-up successful",
        user: {
            id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }
    });

};

export const signIn = async (req: Request<{}, {}, userBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
        throw new ApiError(401, "INVALID_CREDENTIALS", "Invalid email or password");
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        getJwtSecret(),
        {
            expiresIn: "7d"
        }
    );
    res.status(200).json({
        message: "sign-in successful",
        token
    });

}





