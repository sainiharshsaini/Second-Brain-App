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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// import { ContentModel, UserModel, LinkModel } from "../config/db";
const user_model_1 = require("../models/user.model");
// import bcrypt from "bcrypt";
const zod_1 = require("zod");
// import jwt from "jsonwebtoken";
require("dotenv/config");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const user_controller_1 = require("../controllers/user.controller");
const content_controller_1 = require("../controllers/content.controller");
const logger_1 = require("../utils/logger");
// const jwtSecret = process.env.JWT_SECRET;
const userSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must not exceed 20 characters" })
        .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" }),
});
// user routes
router.post('/signup', user_controller_1.userSignup);
router.post('/signin', user_controller_1.userSignin);
// router.post('/signup', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const saltRounds = 10;
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//         await UserModel.create({
//             username,
//             password: hashedPassword
//         })
//         res.status(201).json({
//             message: "User signed up successfully"
//         })
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "User already exists"
//         });
//     }
// })
//@ts-ignore
// router.post('/signin', async (req, res) => {
//     const { username, password } = req.body;
//     try {
//         const existingUser = await UserModel.findOne({ username });
//         if (!existingUser) {
//             return res.status(404).json({
//                 message: "User not found"
//             })
//         }
//         const passwordMatch = await bcrypt.compare(password, existingUser.password);
//         if (passwordMatch) {
//             //@ts-ignore
//             const token = jwt.sign({
//                 id: existingUser._id
//                 //@ts-ignore
//             }, jwtSecret);
//             res.json({
//                 message: "Login Successfully",
//                 token
//             })
//         } else {
//             res.status(401).json({
//                 message: "Invalid credentials"
//             })
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "An error occurred"
//         });
//     }
// })
router.post('/content', auth_middleware_1.default, content_controller_1.postUserContent);
router.get('/content', auth_middleware_1.default, content_controller_1.getUserContent);
router.delete('/content', auth_middleware_1.default, content_controller_1.deleteUserContent);
// router.post('/content', userAuth, async (req, res) => {
//     const { link, type } = req.body;
//     await ContentModel.create({
//         link,
//         type,
//         title: req.body.title,
//         //@ts-ignore
//         userId: req.userId,
//         tags: []
//     })
//     res.json({
//         message: "Content added"
//     })
// })
// router.get('/content', userAuth, async (req, res) => {
//     //@ts-ignore
//     const userId = req.userId;
//     const content = await ContentModel.find({
//         userId
//     }).populate("userId", "username")
//     res.json({
//         content
//     })
// })
// router.delete('/content', userAuth, async (req, res) => {
//     const contentId = req.body.contentId;
//     await ContentModel.deleteMany({
//         contentId,
//         //@ts-ignore
//         userId: req.userId
//     })
//     res.json({
//         message: "Deleted"
//     })
// })
router.post('/brain/share', auth_middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existingLink = yield user_model_1.LinkModel.findOne({
            //@ts-ignore
            userId: req.userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = (0, logger_1.random)(10);
        yield user_model_1.LinkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield user_model_1.LinkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        });
        res.json({
            message: "Removed link"
        });
    }
}));
router.get('/brain/:shareLink', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield user_model_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.status(411).json({
            message: "Sorry incorrect input"
        });
        return;
    }
    // userId
    const content = yield user_model_1.ContentModel.find({
        userId: link.userId
    });
    console.log(link);
    const user = yield user_model_1.UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally not happen"
        });
        return;
    }
    res.json({
        username: user.username,
        content: content
    });
}));
exports.default = router;
