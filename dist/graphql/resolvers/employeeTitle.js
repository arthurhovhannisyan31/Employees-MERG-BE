"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployeeTitle = exports.employeesTitles = void 0;
// deps
// local
const models_1 = require("../../models");
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.employeesTitles = async (_, req) => {
    helpers_2.authCheck(req);
    try {
        const result = await models_1.EmployeeTitle.find();
        return result.map(helpers_1.transformEmployeeTitle);
    }
    catch (err) {
        throw err;
    }
};
exports.createEmployeeTitle = async ({ input: { employee, title, start_date, end_date }, }, req) => {
    helpers_2.authCheck(req);
    try {
        const duplicate = await models_1.EmployeeTitle.findOne({
            employee,
            title,
            start_date,
            end_date,
        });
        if (duplicate) {
            throw new Error(`Employee ${employee} title ${title} record already exists`);
        }
        const employeeTitle = new models_1.EmployeeTitle({
            employee,
            title,
            start_date,
            end_date,
        });
        const result = await employeeTitle.save();
        return helpers_1.transformEmployeeTitle(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=employeeTitle.js.map