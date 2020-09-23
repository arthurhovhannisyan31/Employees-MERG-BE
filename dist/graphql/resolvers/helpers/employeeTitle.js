"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEmployeeTitle = exports.getSingleEmployeeTitle = exports.getEmployeeTitles = exports.employeeTitleLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
const _1 = require("./");
// @ts-ignore
exports.employeeTitleLoader = new dataloader_1.default((ids) => exports.getEmployeeTitles(ids));
exports.getEmployeeTitles = async (ids) => {
    try {
        const employeesTitles = await models_1.EmployeeTitle.find({ _id: { $in: ids } });
        employeesTitles.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return employeesTitles.map(exports.transformEmployeeTitle);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleEmployeeTitle = async (id) => {
    try {
        const employeeTitle = await exports.employeeTitleLoader.load(id.toString());
        if (!employeeTitle)
            throw new Error(`Employee ${id} title record does not exist `);
        return employeeTitle;
    }
    catch (err) {
        throw err;
    }
};
exports.transformEmployeeTitle = ({ _id, employee, title, start_date, end_date, }) => ({
    _id,
    employee: _1.getSingleEmployee(employee),
    title: _1.getSingleTitle(title),
    start_date,
    end_date,
});
//# sourceMappingURL=employeeTitle.js.map