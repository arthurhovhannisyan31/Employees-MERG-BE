"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformEvent = exports.getSingleEvent = exports.getEvents = exports.eventLoader = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../../models");
const _1 = require("./");
// helpers
const helpers_1 = require("../../utils/helpers");
// @ts-ignore
exports.eventLoader = new dataloader_1.default((eventIds) => exports.getEvents(eventIds));
exports.getEvents = async (eventIds) => {
    try {
        const events = await models_1.Event.find({ _id: { $in: eventIds } });
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
        const event = await exports.eventLoader.load(eventId.toString());
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
exports.transformEvent = (event) => {
    return {
        ...event,
        _id: event._id,
        title: event.title,
        description: event.description,
        price: event.price,
        date: helpers_1.dateToISOString(event.date),
        // @ts-ignore
        creator: _1.getSingleUser(event.creator),
    };
};
//# sourceMappingURL=events.js.map