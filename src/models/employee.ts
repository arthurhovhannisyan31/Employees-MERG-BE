// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Gender } from './gender'
import { Department } from './departmnet'
import { Title } from './title'
import { Paycheck } from './paycheck'
import { EmployeeTitle } from './employeeTitle'
import { Employment } from './employment'

export interface Employee {
  _id: string
  birth_date: string
  first_name: string
  last_name: string
  hire_date: string
  gender: Gender
  department: Department
  title: Title
}

export interface EmployeeResponse extends Employee {
  paychecks: Promise<Paycheck>[]
  titles: Promise<EmployeeTitle>[]
  employments: Promise<Employment>[]
}

export interface Employees {
  nodes: Promise<EmployeeResponse>[]
  count: number
}

export interface CreateEmployeeInput {
  input: Employee
}
export interface UpdateEmployeeInput {
  input: Partial<Employee> & { id: string }
}
export interface GetEmployeeInput {
  input: {
    id: string
  }
}

export interface GetEmployeesInput {
  input: {
    limit: number
    offset: number
  }
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
