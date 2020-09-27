"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmployee = exports.employee = exports.employees = void 0;
// deps
const models_1 = require("../../models");
// local
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.employees = async () => {
    try {
        const result = await models_1.Employee.find();
        return result.map(helpers_1.transformEmployee);
    }
    catch (err) {
        throw err;
    }
};
exports.employee = async ({ input: { id } }, req) => {
    helpers_2.authCheck(req);
    try {
        const result = await models_1.Employee.findOne({ _id: id });
        if (!result) {
            throw new Error(`Employee ${id} was not found`);
        }
        return helpers_1.transformEmployee(result);
    }
    catch (err) {
        throw err;
    }
};
exports.createEmployee = async ({ input: { birth_date, first_name, last_name, gender, hire_date }, }, req) => {
    helpers_2.authCheck(req);
    try {
        const duplicate = await models_1.Employee.findOne({
            birth_date,
            first_name,
            last_name,
            gender,
            hire_date,
        });
        if (duplicate) {
            throw new Error(`Employee name:${first_name}, ${last_name} already exists`);
        }
        const employee = new models_1.Employee({
            birth_date,
            first_name,
            last_name,
            gender,
            hire_date,
        });
        const result = await employee.save();
        return helpers_1.transformEmployee(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=employees.js.map