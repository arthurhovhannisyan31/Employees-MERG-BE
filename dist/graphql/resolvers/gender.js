"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGender = exports.genders = void 0;
// deps
// local
const models_1 = require("../../models");
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.genders = async () => {
    try {
        const result = await models_1.Gender.find();
        return result.map(helpers_1.transformGender);
    }
    catch (err) {
        throw err;
    }
};
exports.createGender = async ({ input: { name } }, req) => {
    helpers_2.authCheck(req);
    try {
        const duplicate = await models_1.Gender.findOne({ name });
        if (duplicate) {
            throw new Error(`Gender ${name} already exists`);
        }
        const gender = new models_1.Gender({
            name,
        });
        const result = await gender.save();
        return helpers_1.transformGender(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=gender.js.map