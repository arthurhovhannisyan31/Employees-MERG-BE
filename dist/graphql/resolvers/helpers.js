"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformBooking = exports.transformEmployeeTitle = exports.transformTitle = exports.transformDepartment = exports.transformEmployment = exports.transformEmployee = exports.transformGender = exports.transformEvent = void 0;
// deps
const dataloader_1 = __importDefault(require("dataloader"));
// local
const models_1 = require("../../models");
// helpers
const date_1 = require("../helpers/date");
// @ts-ignore
const eventLoader = new dataloader_1.default((eventIds) => getEvents(eventIds));
// @ts-ignore
const userLoader = new dataloader_1.default((userIds) => getUsers(userIds));
// @ts-ignore
const employeeLoader = new dataloader_1.default((ids) => getEmployees(ids));
// @ts-ignore
const genderLoader = new dataloader_1.default((ids) => getGenders(ids));
// @ts-ignore
const employmentLoader = new dataloader_1.default((ids) => getEmployments(ids));
// @ts-ignore
const departmentLoader = new dataloader_1.default((ids) => getDepartments(ids));
// @ts-ignore
const titleLoader = new dataloader_1.default((ids) => getTitles(ids));
// @ts-ignore
const employeeTitleLoader = new dataloader_1.default((ids) => getEmployeeTitles(ids));
// Event -----------------------------------------------------------------------
const getEvents = async (eventIds) => {
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
const getSingleEvent = async (eventId) => {
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
exports.transformEvent = (event) => {
    return {
        ...event,
        _id: event._id,
        title: event.title,
        description: event.description,
        price: event.price,
        date: date_1.dateToISOString(event.date),
        // @ts-ignore
        creator: getSingleUser(event.creator),
    };
};
// User ------------------------------------------------------------------------
const getUsers = async (userIds) => {
    try {
        // @ts-ignore
        return await models_1.User.find({ _id: { $in: userIds } });
    }
    catch (err) {
        throw err;
    }
};
const getSingleUser = async (userId) => {
    try {
        const user = await userLoader.load(userId.toString());
        if (!user)
            throw new Error('User not found');
        return {
            ...user,
            // @ts-ignore
            _id: user?._id,
            // @ts-ignore
            email: user?.email,
            // @ts-ignore
            password: '',
            // @ts-ignore
            createdEvents: () => eventLoader.loadMany(user.createdEvents),
        };
    }
    catch (err) {
        throw err;
    }
};
// todo add sorting like in events
// todo add transforming like in events
// Gender ----------------------------------------------------------------------
const getGenders = async (ids) => {
    try {
        const genders = await models_1.Gender.find({ _id: { $in: ids } });
        genders.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return genders.map(exports.transformGender);
    }
    catch (err) {
        throw err;
    }
};
const getSingleGender = async (id) => {
    try {
        const gender = await genderLoader.load(id.toString());
        if (!gender)
            throw new Error(`Gender ${id} was not found`);
        return gender;
    }
    catch (err) {
        throw err;
    }
};
exports.transformGender = ({ _id, name }) => ({
    _id,
    name,
});
// Employee --------------------------------------------------------------------
const getEmployees = async (ids) => {
    try {
        const employees = await models_1.Employee.find({ _id: { $in: ids } });
        employees.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return employees.map(exports.transformEmployee);
    }
    catch (err) {
        throw err;
    }
};
const getSingleEmployee = async (id) => {
    try {
        const employee = await employeeLoader.load(id.toString());
        if (!employee)
            throw new Error('Employee not found');
        return employee;
    }
    catch (err) {
        throw err;
    }
};
exports.transformEmployee = ({ _id, last_name, gender, first_name, birth_date, }) => {
    return {
        _id,
        birth_date,
        first_name,
        last_name,
        gender: getSingleGender(gender),
    };
};
// function handleSort<T>(arr: T[]):T[]{// @ts-ignore
//   return arr.sort((a, b) => arr.indexOf(a._id.toString()) - arr.indexOf(b._id.toString()))}
// Employment ------------------------------------------------------------------
const getEmployments = async (ids) => {
    try {
        const employments = await models_1.Employment.find({ _id: { $in: ids } });
        employments.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return employments.map(exports.transformEmployment);
    }
    catch (err) {
        throw err;
    }
};
// const getSingleEmployment = async (id:string) => {
//   try {
//     const employment = await employeeLoader.load(id.toString())
//     if (!employment) throw new Error(`Employment record were not found`)
//     return employment
//   } catch (err){
//    throw err
//   }
// }
exports.transformEmployment = ({ _id, employee, department, start_date, end_date, }) => {
    return {
        _id,
        employee: getSingleEmployee(employee),
        department: getSingleDepartment(department),
        start_date,
        end_date,
    };
};
// Department ------------------------------------------------------------------
const getDepartments = async (ids) => {
    try {
        const departments = await models_1.Department.find({ _id: { $in: ids } });
        departments.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return departments.map(exports.transformDepartment);
    }
    catch (err) {
        throw err;
    }
};
const getSingleDepartment = async (id) => {
    try {
        const department = await departmentLoader.load(id.toString());
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
// Title -----------------------------------------------------------------------
const getTitles = async (ids) => {
    try {
        const titles = await models_1.Title.find({ _id: { $in: ids } });
        titles.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return titles.map(exports.transformTitle);
    }
    catch (err) {
        throw err;
    }
};
const getSingleTitle = async (id) => {
    try {
        const title = await titleLoader.load(id.toString());
        if (!title)
            throw new Error(`Title ${id} not found`);
        return title;
    }
    catch (err) {
        throw err;
    }
};
exports.transformTitle = ({ _id, name }) => ({
    _id,
    name,
});
// EmployeeTitle----------------------------------------------------------------
const getEmployeeTitles = async (ids) => {
    try {
        const employeesTitles = await models_1.EmployeeTitle.find({ _id: { $in: ids } });
        employeesTitles.sort((a, b) => ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()));
        return employeesTitles.map(exports.transformEmployeeTitle);
    }
    catch (err) {
        throw err;
    }
};
// const getSingleEmployeeTitle = async (id: string) => {
//   try {
//     const employeeTitle = await employeeTitleLoader.load(id.toString())
//     if (!employeeTitle)
//       throw new Error(`Employee ${id} title record does not exist `)
//     return employeeTitle
//   } catch (err) {
//     throw err
//   }
// }
exports.transformEmployeeTitle = ({ _id, employee, title, start_date, end_date, }) => {
    return {
        _id,
        employee: getSingleEmployee(employee),
        title: getSingleTitle(title),
        start_date,
        end_date,
    };
};
// Booking--- ------------------------------------------------------------------
exports.transformBooking = (booking) => ({
    ...booking,
    _id: booking.id,
    user: getSingleUser(booking.user),
    event: getSingleEvent(booking.event),
    createdAt: date_1.dateToISOString(booking.createdAt),
    updatedAt: date_1.dateToISOString(booking.updatedAt),
});
//# sourceMappingURL=helpers.js.map