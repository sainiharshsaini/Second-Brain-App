"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.ContentModel = exports.TagModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const db_1 = require("../config/db");
exports.UserModel = (0, mongoose_1.model)('User', db_1.userSchema);
exports.TagModel = (0, mongoose_1.model)('Tag', db_1.tagSchema);
exports.ContentModel = (0, mongoose_1.model)('Content', db_1.contentSchema);
exports.LinkModel = (0, mongoose_1.model)('Link', db_1.linkSchema);
