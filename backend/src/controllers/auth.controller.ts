import type { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.js";

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
        throw new Error("JWT secret is missing")
    }
    return secret;
}

export const signUp = async (req: Request<{}, {}, userBody>, res: Response) => {

    const result = validateUser.safeParse(req.body);

    if (!result.success) {
        console.log(result.error?.issues)
        return res.status(411).json({
            message: "Error in inputs",
            error: result.error.issues
        })
    }

    const { email, username, password, firstName, lastName } = result.data;

    try {
        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(403).json({
                message: "user already exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName
        })
        return res.status(201).json({
            message: "sign-up successful",
            user: {
                id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            }
        });

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "Interval Server Error"
        })
    };
};

export const signIn = async (req: Request<{}, {}, userBody>, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "user not found. Please sign up first"
            })
        };
        if (!user) {
            throw new Error("user not found")
        }

        const passwordMatched = await bcrypt.compare(password, user.password);

        if (!passwordMatched) {
            return res.status(401).json({
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign(
            {
                id: user?._id,
            },
            getJwtSecret(),
            {
                expiresIn: "7d"
            }
        );
        res.status(200).json({
            message: "sign-in successful",
            token
        })


    } catch (error) {
        res.status(500).json({
            message: "Server error"
        })
    }

}





