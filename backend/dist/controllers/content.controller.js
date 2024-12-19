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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserContent = exports.getUserContent = exports.postUserContent = void 0;
const user_model_1 = require("../models/user.model");
const postUserContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, type } = req.body;
    yield user_model_1.ContentModel.create({
        link,
        type,
        title: req.body.title,
        //@ts-ignore
        userId: req.userId,
        tags: []
    });
    res.json({
        message: "Content added"
    });
});
exports.postUserContent = postUserContent;
const getUserContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.userId;
    const content = yield user_model_1.ContentModel.find({
        userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
exports.getUserContent = getUserContent;
const deleteUserContent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    yield user_model_1.ContentModel.deleteMany({
        contentId,
        //@ts-ignore
        userId: req.userId
    });
    res.json({
        message: "Deleted"
    });
});
exports.deleteUserContent = deleteUserContent;
