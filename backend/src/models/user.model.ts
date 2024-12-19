import { model } from "mongoose";
import { userSchema, tagSchema, contentSchema, linkSchema } from "../config/db";

export const UserModel = model('User', userSchema);
export const TagModel = model('Tag', tagSchema);
export const ContentModel = model('Content', contentSchema);
export const LinkModel = model('Link', linkSchema);