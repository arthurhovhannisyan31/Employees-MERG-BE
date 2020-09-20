"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// global imports
// local imports
const auth_1 = require("./auth");
const events_1 = require("./events");
const bookings_1 = require("./bookings");
const departments_1 = require("./departments");
exports.resolvers = {
    // events
    events: events_1.events,
    bookings: bookings_1.bookings,
    createEvent: events_1.createEvent,
    createUser: auth_1.createUser,
    bookEvent: bookings_1.bookEvent,
    cancelBooking: bookings_1.cancelBooking,
    login: auth_1.login,
    // employees
    departments: departments_1.departments,
    createDepartment: departments_1.createDepartment,
};
//# sourceMappingURL=index.js.map