import { RequestHandler } from "express";
import { ContentModel } from "../models/user.model";


export const postUserContent: RequestHandler = async(req, res, next) => {
    const { link, type } = req.body;
    
        await ContentModel.create({
            link,
            type,
            title: req.body.title,
            //@ts-ignore
            userId: req.userId,
            tags: []
        })
    
        res.json({
            message: "Content added"
        })
}

export const getUserContent: RequestHandler = async(req, res, next) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId
    }).populate("userId", "username")

    res.json({
        content
    })
}

export const deleteUserContent: RequestHandler = async(req, res, next) => {
    const contentId = req.body.contentId;
    
    await ContentModel.deleteMany({
        _id: contentId
    })

    res.json({
        message: "Deleted"
    })
}