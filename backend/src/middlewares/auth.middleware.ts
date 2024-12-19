import jwt, { JwtPayload } from "jsonwebtoken";
import 'dotenv/config';
import { NextFunction, Request, Response } from "express";

const jwtSecret = process.env.JWT_SECRET;

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"];

    //@ts-ignore
    const decoded = jwt.verify(token as string, jwtSecret);

    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "Incorrect credentials"
            })
            return;
        }
        //@ts-ignore
        req.userId = (decoded as JwtPayload).id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}

export default auth;