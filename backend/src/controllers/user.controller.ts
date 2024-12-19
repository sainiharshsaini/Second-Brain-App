import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const userSignup: RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await UserModel.create({
            username,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User signed up successfully"
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "User already exists"
        });
    }
}

//@ts-ignore
export const userSignin: RequestHandler = async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ username });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if (passwordMatch) {
            //@ts-ignore
            const token = jwt.sign({
                id: existingUser._id
                //@ts-ignore
            }, jwtSecret);

            res.json({
                message: "Login Successfully",
                token
            })
        } else {
            res.status(401).json({
                message: "Invalid credentials"
            })
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred"
        });
    }
}