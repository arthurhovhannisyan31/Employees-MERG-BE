// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Employee, Employment, Paycheck, EmployeeTitle } from './generated'

export interface EmployeeExtended extends Employee {
  paychecks: Promise<Paycheck>[]
  titles: Promise<EmployeeTitle>[]
  employments: Promise<Employment>[]
}

export interface EmployeesExtended {
  nodes: Promise<EmployeeExtended>[]
  count: number
}

const EmployeeSchema = new Schema({
  birth_date: {
    type: String,
    required: true,
    trim: true,
  },
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  hire_date: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'Gender',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  title: {
    type: Schema.Types.ObjectId,
    ref: 'Title',
  },
})

export const EmployeeModel = mongoose.model<Employee & Document>(
  'Employee',
  EmployeeSchema,
  'employees'
)
