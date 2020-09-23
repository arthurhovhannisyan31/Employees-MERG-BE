"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDepartment = exports.getSingleDepartment = exports.getDepartments = exports.departmentLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
// @ts-ignore
exports.departmentLoader = new dataloader_1.default((ids) => exports.getDepartments(ids));
exports.getDepartments = async (ids) => {
    try {
        const departments = await models_1.Department.find({ _id: { $in: ids } });
        departments.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return departments.map(exports.transformDepartment);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleDepartment = async (id) => {
    try {
        const department = await exports.departmentLoader.load(id.toString());
        if (!department)
            throw new Error(`Department not found`);
        return department;
    }
    catch (err) {
        throw err;
    }
};
exports.transformDepartment = ({ _id, name }) => ({
    _id,
    name,
});
//# sourceMappingURL=department.js.map