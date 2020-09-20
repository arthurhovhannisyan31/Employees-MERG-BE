"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGender = exports.genders = void 0;
// deps
const gender_1 = require("../../models/gender");
// local
// helpers
const helpers_1 = require("./helpers");
exports.genders = async () => {
    try {
        const result = await gender_1.GenderModel.find();
        return result.map(helpers_1.transformGender);
    }
    catch (err) {
        throw err;
    }
};
exports.createGender = async ({ input: { name } }) => {
    // if (!req.isAuth) {
    //   throw new Error('Unauthenticated request')
    // }
    try {
        const duplicate = await gender_1.GenderModel.findOne({ name });
        if (duplicate) {
            throw new Error(`Gender ${name} already exists`);
        }
        const gender = new gender_1.GenderModel({
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