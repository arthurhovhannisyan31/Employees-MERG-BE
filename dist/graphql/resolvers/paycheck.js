"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaycheck = exports.paycheckHistory = void 0;
// deps
// local
const models_1 = require("../../models");
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.paycheckHistory = async () => {
    try {
        const result = await models_1.Paycheck.find();
        return result.map(helpers_1.transformPaycheck);
    }
    catch (err) {
        throw err;
    }
};
exports.createPaycheck = async ({ input: { employee, salary, start_date, end_date } }, req) => {
    helpers_2.authCheck(req);
    try {
        const duplicate = await models_1.Paycheck.findOne({
            employee,
            salary,
            start_date,
            end_date,
        });
        if (duplicate) {
            throw new Error(`Paycheck for period ${start_date}-${end_date} for employee ${employee} for amount ${salary} already exist`);
        }
        const paycheck = new models_1.Paycheck({
            employee,
            salary,
            start_date,
            end_date,
        });
        const result = await paycheck.save();
        return helpers_1.transformPaycheck(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=paycheck.js.map