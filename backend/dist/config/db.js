"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkSchema = exports.contentSchema = exports.contentTypes = exports.tagSchema = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
const ObjectId = mongoose_1.Types.ObjectId;
exports.userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
exports.tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true }
});
exports.contentTypes = ['image', 'video', 'article', 'audio'];
exports.contentSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: exports.contentTypes, required: true },
    tags: [{ type: ObjectId, ref: 'Tag' }],
    userId: { type: ObjectId, ref: 'User', required: true },
});
exports.linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
});
