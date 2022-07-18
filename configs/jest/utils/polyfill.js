"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestAnimationFrame = (cb) => {
    setTimeout(cb, 0);
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.requestAnimationFrame = requestAnimationFrame;
exports.default = requestAnimationFrame;
