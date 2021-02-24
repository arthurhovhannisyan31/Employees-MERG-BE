// helpers
import { createUser, login, me } from './auth'
import { events, createEvent } from './events'
import { bookings, bookEvent, cancelBooking } from './bookings'
import { departments, createDepartment } from './departments'
import {
  employees,
  createEmployee,
  employee,
  updateEmployee,
} from './employees'
import { titles, createTitle } from './title'
import { genders, createGender } from './gender'
import { employments, createEmployment } from './employments'
import { employeesTitles, createEmployeeTitle } from './employeeTitle'
import { createPaycheck, paycheckHistory } from './paycheck'

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
  me,
  // Department
  departments,
  createDepartment,
  // Employee
  employees,
  employee,
  createEmployee,
  updateEmployee,
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
