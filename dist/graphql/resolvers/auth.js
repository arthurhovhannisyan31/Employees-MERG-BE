"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.createUser = void 0;
// deps
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// local
const user_1 = require("../../models/user");
// @ts-ignore
exports.createUser = async ({ userInput: { email, password }, }) => {
    try {
        const existingUser = await user_1.UserModel.findOne({ email });
        if (existingUser) {
            throw new Error('User exists already');
        }
        const hashedPassword = await bcryptjs_1.hash(password, 12);
        const user = new user_1.UserModel({
            email,
            password: hashedPassword,
        });
        const result = await user.save();
        return {
            _id: result._id,
            // @ts-ignore
            email: result.email,
            password: null,
        };
    }
    catch (err) {
        throw err;
    }
};
exports.login = async ({ email, password }) => {
    const user = await user_1.UserModel.findOne({ email });
    if (!user) {
        throw new Error('User does not exist');
    }
    // @ts-ignore
    const isEqual = await bcryptjs_1.compare(password, user.password);
    if (!isEqual) {
        throw new Error('Password is incorrect');
    }
    const secretKey = process.env.AUTH_SECRET_KEY || '';
    const token = jsonwebtoken_1.default.sign(
    // @ts-ignore
    { userId: user.id, email: user.email }, secretKey, {
        expiresIn: '1h',
    });
    return {
        // @ts-ignore
        userId: user.id,
        token,
        tokenExpiration: 1,
    };
};
//# sourceMappingURL=auth.js.map