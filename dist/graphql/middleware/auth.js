"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.isAuth = (req, _, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        req.isAuth = false;
        return next();
    }
    const token = authHeader.split(' ')?.[1];
    if (!token) {
        req.isAuth = false;
        return next();
    }
    const secretKey = process.env.AUTH_SECRET_KEY || '';
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (err) {
        req.isAuth = false;
        return next();
    }
    if (!decodedToken) {
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    // @ts-ignore
    req.userId = decodedToken.userId;
    next();
};
//# sourceMappingURL=auth.js.map