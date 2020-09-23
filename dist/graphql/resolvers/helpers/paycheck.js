"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPaycheck = exports.getSinglePaycheck = exports.getPaycheckHistory = exports.paycheckLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
const _1 = require("./");
// @ts-ignore
exports.paycheckLoader = new dataloader_1.default((ids) => exports.getPaycheckHistory(ids));
exports.getPaycheckHistory = async (ids) => {
    try {
        const paycheckHistory = await models_1.Paycheck.find({ _id: { $in: ids } });
        paycheckHistory.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return paycheckHistory.map(exports.transformPaycheck);
    }
    catch (err) {
        throw err;
    }
};
exports.getSinglePaycheck = async (id) => {
    try {
        const paycheck = await exports.paycheckLoader.load(id.toString());
        if (!paycheck) {
            throw new Error('Paycheck not found');
        }
        return paycheck;
    }
    catch (err) {
        throw err;
    }
};
exports.transformPaycheck = ({ _id, employee, salary, start_date, end_date, }) => ({
    _id,
    employee: _1.getSingleEmployee(employee),
    salary,
    start_date,
    end_date,
});
//# sourceMappingURL=paycheck.js.map