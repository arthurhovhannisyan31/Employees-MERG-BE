"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformGender = exports.getSingleGender = exports.getGenders = exports.genderLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
// @ts-ignore
exports.genderLoader = new dataloader_1.default((ids) => exports.getGenders(ids));
exports.getGenders = async (ids) => {
    try {
        const genders = await models_1.Gender.find({ _id: { $in: ids } });
        genders.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return genders.map(exports.transformGender);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleGender = async (id) => {
    try {
        const gender = await exports.genderLoader.load(id.toString());
        if (!gender)
            throw new Error(`Gender ${id} was not found`);
        return gender;
    }
    catch (err) {
        throw err;
    }
};
exports.transformGender = ({ _id, name }) => ({
    _id,
    name,
});
//# sourceMappingURL=gender.js.map