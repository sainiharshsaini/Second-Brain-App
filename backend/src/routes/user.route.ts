import express from "express";
const router = express.Router();
// import { ContentModel, UserModel, LinkModel } from "../config/db";
// import { ContentModel, UserModel, LinkModel } from "../models/user.model";
// import bcrypt from "bcrypt";
// import { z } from "zod";
// import jwt from "jsonwebtoken";
// import 'dotenv/config';
import userAuth from "../middlewares/auth.middleware";
import { userSignup, userSignin } from '../controllers/user.controller';
import { postUserContent, getUserContent, deleteUserContent } from "../controllers/content.controller";
import { postBrainShareLink, getBrainShareLink } from "../controllers/brainShare.controller";
// import { random } from "../utils/logger";

// const jwtSecret = process.env.JWT_SECRET;

// user routes
router.post('/signup', userSignup);
router.post('/signin', userSignin);

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

router.post('/content', userAuth, postUserContent);
router.get('/content', userAuth, getUserContent);
router.delete('/content', userAuth, deleteUserContent);

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

router.post('/brain/share', userAuth, postBrainShareLink);
router.get('/brain/:shareLink', getBrainShareLink);

// router.post('/brain/share', userAuth, async (req, res) => {
//     const share = req.body.share;

//     if (share) {
//         const existingLink = await LinkModel.findOne({
//             //@ts-ignore
//             userId: req.userId
//         });

//         if (existingLink) {
//             res.json({
//                 hash: existingLink.hash
//             })
//             return;
//         }

//         const hash = random(10);

//         await LinkModel.create({
//             //@ts-ignore
//             userId: req.userId,
//             hash: hash
//         })

//         res.json({
//             hash
//         })
//     } else {
//         await LinkModel.deleteOne({
//             //@ts-ignore
//             userId: req.userId
//         });

//         res.json({
//             message: "Removed link"
//         })
//     }
// })

// router.get('/brain/:shareLink', async (req, res) => {
//     const hash = req.params.shareLink;

//     const link = await LinkModel.findOne({
//         hash
//     });

//     if (!link) {
//         res.status(411).json({
//             message: "Sorry incorrect input"
//         })
//         return;
//     }
//     // userId
//     const content = await ContentModel.find({
//         userId: link.userId
//     })

//     console.log(link);
//     const user = await UserModel.findOne({
//         _id: link.userId
//     })

//     if (!user) {
//         res.status(411).json({
//             message: "user not found, error should ideally not happen"
//         })
//         return;
//     }

//     res.json({
//         username: user.username,
//         content: content
//     })

// })

export default router; 