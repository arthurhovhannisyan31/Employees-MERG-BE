"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.bookings = exports.bookEvent = void 0;
// local
const booking_1 = require("../../models/booking");
const events_1 = require("../../models/events");
// helpers
const helpers_1 = require("./helpers");
exports.bookEvent = async ({ eventId }, req) => {
    // @ts-ignore
    if (!req.isAuth) {
        throw new Error('Unauthenticated request');
    }
    try {
        const fetchedEvent = await events_1.EventModel.findOne({ _id: eventId });
        if (!fetchedEvent) {
            throw new Error(`Event ${eventId} not found`);
        }
        const booking = new booking_1.BookingModel({
            // @ts-ignore
            user: req.userId,
            // @ts-ignore
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
        // @ts-ignore
        if (!req.isAuth) {
            throw new Error('Unauthenticated request');
        }
        // @ts-ignore
        const bookings = await booking_1.BookingModel.find({ user: req.userId });
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
    // @ts-ignore
    if (!req.isAuth) {
        throw new Error('Unauthenticated request');
    }
    try {
        const booking = await booking_1.BookingModel.findById(bookingId).populate('event');
        // @ts-ignore
        const event = helpers_1.transformEvent(booking.event);
        await booking_1.BookingModel.deleteOne({ _id: bookingId });
        return event;
    }
    catch (err) {
        throw err;
    }
};
//# sourceMappingURL=bookings.js.map