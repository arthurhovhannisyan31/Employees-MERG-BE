"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleUser = exports.getUsers = exports.userLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
const _1 = require("./");
// helpers
// @ts-ignore
exports.userLoader = new dataloader_1.default((userIds) => exports.getUsers(userIds));
exports.getUsers = async (userIds) => {
    try {
        // @ts-ignore
        return await models_1.User.find({ _id: { $in: userIds } });
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleUser = async (userId) => {
    try {
        const user = await exports.userLoader.load(userId.toString());
        if (!user)
            throw new Error('User not found');
        return {
            ...user,
            _id: user?._id,
            email: user?.email,
            password: '',
            // @ts-ignore
            createdEvents: () => _1.eventLoader.loadMany(user.createdEvents),
        };
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=auth.js.map