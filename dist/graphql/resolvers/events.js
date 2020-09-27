"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEvent = exports.events = void 0;
// deps
// local
const events_1 = require("../../models/events");
const user_1 = require("../../models/user");
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.events = async () => {
    try {
        const result = await events_1.EventModel.find();
        // @ts-ignore
        return result.map(helpers_1.transformEvent);
    }
    catch (err) {
        throw err;
    }
};
exports.createEvent = async ({ eventInput: { date, description, price, title } }, req) => {
    helpers_2.authCheck(req);
    try {
        const event = new events_1.EventModel({
            title,
            description,
            price: +price,
            date: new Date(date),
            // @ts-ignore
            creator: req.userId,
        });
        const result = await event.save();
        // @ts-ignore
        const user = await user_1.UserModel.findById(req.userId);
        if (!user) {
            throw new Error('User not found');
        }
        // @ts-ignore
        user.createdEvents.push(event);
        await user.save();
        // @ts-ignore
        return helpers_1.transformEvent(result);
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=events.js.map