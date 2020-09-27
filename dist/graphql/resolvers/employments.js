"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployment = exports.employments = void 0;
// deps
const models_1 = require("../../models");
// local
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.employments = async () => {
    try {
        const result = await models_1.Employment.find();
        return result.map(helpers_1.transformEmployment);
    }
    catch (err) {
        throw err;
    }
};
exports.createEmployment = async ({ input: { employee, department, start_date, end_date }, }, req) => {
    try {
        helpers_2.authCheck(req);
        const duplicate = await models_1.Employment.findOne({
            employee,
            department,
            start_date,
            end_date,
        });
        if (duplicate) {
            throw new Error(`Record already exists`);
        }
        const employment = new models_1.Employment({
            employee,
            department,
            start_date,
            end_date,
        });
        const result = await employment.save();
        return helpers_1.transformEmployment(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=employments.js.map