"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true }
});
const contentTypes = ['image', 'video', 'article', 'audio'];
const contentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    tags: [{ type: ObjectId, ref: 'Tag' }],
    userId: { type: ObjectId, ref: 'User', required: true },
});
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
exports.TagModel = (0, mongoose_1.model)('Tag', tagSchema);
exports.ContentModel = (0, mongoose_1.model)('Content', contentSchema);
exports.LinkModel = (0, mongoose_1.model)('Link', linkSchema);
