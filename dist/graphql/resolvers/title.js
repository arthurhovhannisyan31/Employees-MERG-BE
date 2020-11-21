"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTitle = exports.titles = void 0;
// deps
// local
const title_1 = require("../../models/title");
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.titles = async (_, req) => {
    helpers_2.authCheck(req);
    try {
        const result = await title_1.TitleModel.find();
        return result.map(helpers_1.transformTitle);
    }
    catch (err) {
        throw err;
    }
};
exports.createTitle = async ({ input: { name } }, req) => {
    if (!req.isAuth) {
        throw new Error('Unauthenticated request');
    }
    try {
        const duplicate = await title_1.TitleModel.findOne({ name });
        if (duplicate) {
            throw new Error(`Title ${name} already exists`);
        }
        const title = new title_1.TitleModel({
            name,
        });
        const result = await title.save();
        return helpers_1.transformTitle(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=title.js.map