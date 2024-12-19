"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const jwtSecret = process.env.JWT_SECRET;
const auth = (req, res, next) => {
    const token = req.headers["authorization"];
    //@ts-ignore
    const decoded = jsonwebtoken_1.default.verify(token, jwtSecret);
    if (decoded) {
        if (typeof decoded === "string") {
            res.status(403).json({
                message: "Incorrect credentials"
            });
            return;
        }
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        });
    }
};
exports.default = auth;
