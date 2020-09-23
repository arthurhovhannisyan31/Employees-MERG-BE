// deps
// local
import { createUser, login } from './auth'
import { events, createEvent } from './events'
import { bookings, bookEvent, cancelBooking } from './bookings'
import { departments, createDepartment } from './departments'
import { employees, createEmployee } from './employees'
import { titles, createTitle } from './title'
import { genders, createGender } from './gender'
import { employments, createEmployment } from './employments'
import { employeesTitles, createEmployeeTitle } from './employeeTitle'
import { createPaycheck, paycheckHistory } from './paycheck'
// helpers

export const resolvers = {
  // Events
  events,
  createEvent,
  // Booking
  bookings,
  bookEvent,
  cancelBooking,
  // User
  createUser,
  login,
  // Department
  departments,
  createDepartment,
  // Employee
  employees,
  createEmployee,
  // Title
  titles,
  createTitle,
  // Gender
  genders,
  createGender,
  // Employment
  employments,
  createEmployment,
  // EmployeeTitle
  employeesTitles,
  createEmployeeTitle,
  // Paycheck
  paycheckHistory,
  createPaycheck,
}
