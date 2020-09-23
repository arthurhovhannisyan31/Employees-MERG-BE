"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEmployee = exports.getSingleEmployee = exports.getEmployees = exports.employeeLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
const _1 = require("./");
// @ts-ignore
exports.employeeLoader = new dataloader_1.default((ids) => exports.getEmployees(ids));
exports.getEmployees = async (ids) => {
    try {
        const employees = await models_1.Employee.find({ _id: { $in: ids } });
        employees.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return employees.map(exports.transformEmployee);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleEmployee = async (id) => {
    try {
        const employee = await exports.employeeLoader.load(id.toString());
        if (!employee)
            throw new Error('Employee not found');
        return employee;
    }
    catch (err) {
        throw err;
    }
};
exports.transformEmployee = ({ _id, last_name, gender, first_name, birth_date, hire_date, }) => {
    return {
        _id,
        birth_date,
        first_name,
        last_name,
        gender: _1.getSingleGender(gender),
        hire_date,
    };
};
//# sourceMappingURL=employee.js.map