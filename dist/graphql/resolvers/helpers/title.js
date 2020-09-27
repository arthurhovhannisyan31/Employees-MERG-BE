"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTitle = exports.getSingleTitle = exports.getTitles = exports.titleLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
const models_1 = require("../../../models");
// local
// helpers
// @ts-ignore
exports.titleLoader = new dataloader_1.default((ids) => exports.getTitles(ids));
exports.getTitles = async (ids) => {
    try {
        const titles = await models_1.Title.find({ _id: { $in: ids } });
        titles.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return titles.map(exports.transformTitle);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleTitle = async (id) => {
    try {
        const title = await exports.titleLoader.load(id.toString());
        if (!title)
            throw new Error(`Title ${id} not found`);
        return title;
    }
    catch (err) {
        throw err;
    }
};
exports.transformTitle = ({ _id, name }) => ({
    _id,
    name,
});
//# sourceMappingURL=title.js.map