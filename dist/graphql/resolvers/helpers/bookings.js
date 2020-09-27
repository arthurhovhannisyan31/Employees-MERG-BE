"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformBooking = void 0;
// deps
// local
const _1 = require("./");
const helpers_1 = require("../../utils/helpers");
exports.transformBooking = (booking) => ({
    ...booking,
    _id: booking.id,
    user: _1.getSingleUser(booking.user),
    event: _1.getSingleEvent(booking.event),
    createdAt: helpers_1.dateToISOString(booking.createdAt),
    updatedAt: helpers_1.dateToISOString(booking.updatedAt),
});
//# sourceMappingURL=bookings.js.map