"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformDepartment = exports.transformBooking = exports.transformEvent = exports.getSingleUser = exports.getUsers = exports.getSingleEvent = exports.getEvents = void 0;
const events_1 = require("../../models/events");
const user_1 = require("../../models/user");
const date_1 = require("../helpers/date");
const dataloader_1 = __importDefault(require("dataloader"));
// @ts-ignore
const eventLoader = new dataloader_1.default((eventIds) => {
    return exports.getEvents(eventIds);
});
// @ts-ignore
const userLoader = new dataloader_1.default((userIds) => {
    return exports.getUsers(userIds);
});
exports.getEvents = async (eventIds) => {
    try {
        const events = await events_1.EventModel.find({ _id: { $in: eventIds } });
        // @ts-ignore
        events.sort((a, b) => {
            return (eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString()));
        });
        // @ts-ignore
        return events.map(exports.transformEvent);
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleEvent = async (eventId) => {
    try {
        const event = await eventLoader.load(eventId.toString());
        if (!event) {
            throw new Error(`Event ${eventId} not found`);
        }
        // @ts-ignore
        return event;
    }
    catch (err) {
        throw err;
    }
};
exports.getUsers = async (userIds) => {
    try {
        // @ts-ignore
        return await user_1.UserModel.find({ _id: { $in: userIds } });
    }
    catch (err) {
        throw err;
    }
};
exports.getSingleUser = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString());
        if (!user)
            throw new Error('User not found');
        const createdEventsIds = user.createdEvents.map((event) => event.toString());
        return {
            ...user,
            // @ts-ignore
            _id: user?._id,
            // @ts-ignore
            email: user?.email,
            // @ts-ignore
            password: '',
            // @ts-ignore
            createdEvents: () => eventLoader.loadMany(createdEventsIds),
        };
    }
    catch (err) {
        throw err;
    }
};
exports.transformEvent = (event) => {
    return {
        ...event,
        _id: event._id,
        title: event.title,
        description: event.description,
        price: event.price,
        date: date_1.dateToISOString(event.date),
        // @ts-ignore
        creator: exports.getSingleUser(event.creator),
    };
};
exports.transformBooking = (booking) => ({
    ...booking,
    _id: booking.id,
    // @ts-ignore
    user: exports.getSingleUser(booking.user),
    // @ts-ignore
    event: exports.getSingleEvent(booking.event),
    // @ts-ignore
    createdAt: date_1.dateToISOString(booking.createdAt),
    // @ts-ignore
    updatedAt: date_1.dateToISOString(booking.updatedAt),
});
exports.transformDepartment = (department) => {
    return department;
};
//# sourceMappingURL=helpers.js.map