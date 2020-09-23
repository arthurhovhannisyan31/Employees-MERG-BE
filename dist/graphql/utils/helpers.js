"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = exports.dateToISOString = void 0;
exports.dateToISOString = (date) => new Date(date).toISOString();
exports.authCheck = (req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated request');
    }
};
//# sourceMappingURL=helpers.js.map