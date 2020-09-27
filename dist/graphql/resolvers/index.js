"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
// deps
// local
const auth_1 = require("./auth");
const events_1 = require("./events");
const bookings_1 = require("./bookings");
const departments_1 = require("./departments");
const employees_1 = require("./employees");
const title_1 = require("./title");
const gender_1 = require("./gender");
const employments_1 = require("./employments");
const employeeTitle_1 = require("./employeeTitle");
const paycheck_1 = require("./paycheck");
// helpers
// todo split folders redux-duck style
exports.resolvers = {
    // Events
    events: events_1.events,
    createEvent: events_1.createEvent,
    // Booking
    bookings: bookings_1.bookings,
    bookEvent: bookings_1.bookEvent,
    cancelBooking: bookings_1.cancelBooking,
    // User
    createUser: auth_1.createUser,
    login: auth_1.login,
    // Department
    departments: departments_1.departments,
    createDepartment: departments_1.createDepartment,
    // Employee
    employees: employees_1.employees,
    employee: employees_1.employee,
    createEmployee: employees_1.createEmployee,
    // Title
    titles: title_1.titles,
    createTitle: title_1.createTitle,
    // Gender
    genders: gender_1.genders,
    createGender: gender_1.createGender,
    // Employment
    employments: employments_1.employments,
    createEmployment: employments_1.createEmployment,
    // EmployeeTitle
    employeesTitles: employeeTitle_1.employeesTitles,
    createEmployeeTitle: employeeTitle_1.createEmployeeTitle,
    // Paycheck
    paycheckHistory: paycheck_1.paycheckHistory,
    createPaycheck: paycheck_1.createPaycheck,
};
//# sourceMappingURL=index.js.map