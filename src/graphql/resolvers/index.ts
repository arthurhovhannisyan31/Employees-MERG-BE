import { createUser, login, me, logout, forgottenPassword } from './auth'
import { departments, createDepartment } from './departments'
import {
  employees,
  createEmployee,
  employee,
  updateEmployee,
} from './employees'
import { employeesTitles, createEmployeeTitle } from './employeeTitle'
import { employments, createEmployment } from './employments'
import { genders, createGender } from './gender'
import { createPaycheck, paycheckHistory } from './paycheck'
import { titles, createTitle } from './title'

export const resolvers = {
  // User
  createUser,
  login,
  logout,
  me,
  forgottenPassword,
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
