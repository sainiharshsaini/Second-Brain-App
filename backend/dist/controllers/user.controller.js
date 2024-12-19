"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignin = exports.userSignup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
const userSignup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        yield user_model_1.UserModel.create({
            username,
            password: hashedPassword
        });
        res.status(201).json({
            message: "User signed up successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "User already exists"
        });
    }
});
exports.userSignup = userSignup;
//@ts-ignore
const userSignin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const existingUser = yield user_model_1.UserModel.findOne({ username });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
        if (passwordMatch) {
            //@ts-ignore
            const token = jsonwebtoken_1.default.sign({
                id: existingUser._id
                //@ts-ignore
            }, jwtSecret);
            res.json({
                message: "Login Successfully",
                token
            });
        }
        else {
            res.status(401).json({
                message: "Invalid credentials"
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred"
        });
    }
});
exports.userSignin = userSignin;
