"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.bookings = exports.bookEvent = void 0;
// deps
// local
const models_1 = require("../../models");
// helpers
const helpers_1 = require("./helpers");
const helpers_2 = require("../utils/helpers");
exports.bookEvent = async ({ eventId }, req) => {
    helpers_2.authCheck(req);
    try {
        const fetchedEvent = await models_1.Event.findOne({ _id: eventId });
        if (!fetchedEvent) {
            throw new Error(`Event ${eventId} not found`);
        }
        const booking = new models_1.Booking({
            user: req.userId,
            event: fetchedEvent._id,
        });
        const result = await booking.save();
        // @ts-ignore
        return helpers_1.transformBooking(result);
    }
    catch (err) {
        throw err;
    }
};
exports.bookings = async (_, req) => {
    try {
        helpers_2.authCheck(req);
        const bookings = await models_1.Booking.find({ user: req.userId });
        return bookings.map((booking) => {
            // @ts-ignore
            return helpers_1.transformBooking(booking);
        });
    }
    catch (err) {
        throw err;
    }
};
exports.cancelBooking = async ({ bookingId }, req) => {
    helpers_2.authCheck(req);
    try {
        const booking = await models_1.Booking.findById(bookingId).populate('event');
        // @ts-ignore
        const event = helpers_1.transformEvent(booking.event);
        await models_1.Booking.deleteOne({ _id: bookingId });
        return event;
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=bookings.js.map