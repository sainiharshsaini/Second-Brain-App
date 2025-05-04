import { Schema, Types } from "mongoose";
const ObjectId = Types.ObjectId;

export const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

export const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
});

export const contentTypes = ['image', 'video', 'article', 'audio'];

export const contentSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, enum: contentTypes, required: true },
    tags: [{ type: ObjectId, ref: 'Tag' }],
    userId: { type: ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: ObjectId, ref: 'User', required: true, unique: true },
});
