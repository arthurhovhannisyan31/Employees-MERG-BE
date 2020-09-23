"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEmployment = exports.getSingleEmployment = exports.getEmployments = exports.employmentLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
const _1 = require("./");
// @ts-ignore
exports.employmentLoader = new dataloader_1.default((ids) => exports.getEmployments(ids));
exports.getEmployments = async (ids) => {
    try {
        const employments = await models_1.Employment.find({ _id: { $in: ids } });
        employments.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return employments.map(exports.transformEmployment);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleEmployment = async (id) => {
    try {
        const employment = await _1.employeeLoader.load(id.toString());
        if (!employment)
            throw new Error(`Employment record were not found`);
        return employment;
    }
    catch (err) {
        throw err;
    }
};
exports.transformEmployment = ({ _id, employee, department, start_date, end_date, }) => {
    return {
        _id,
        employee: _1.getSingleEmployee(employee),
        department: _1.getSingleDepartment(department),
        start_date,
        end_date,
    };
};
//# sourceMappingURL=employment.js.map