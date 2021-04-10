// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { IGender } from './gender'
import { IDepartment } from './departmnet'
import { ITitle } from './title'
import { IPaycheck } from './paycheck'
import { IEmployeeTitle } from './employeeTitle'
import { IEmployment } from './employment'

export interface IEmployee {
  _id: string
  birth_date: string
  first_name: string
  last_name: string
  hire_date: string
  gender: IGender
  department: IDepartment
  title: ITitle
}

export interface IEmployeeResponse extends IEmployee {
  paychecks: Promise<IPaycheck>[]
  titles: Promise<IEmployeeTitle>[]
  employments: Promise<IEmployment>[]
}

export interface IEmployees {
  nodes: Promise<IEmployeeResponse>[]
  count: number
}

export interface ICreateEmployeeInput {
  input: IEmployee
}
export interface IUpdateEmployeeInput {
  input: Partial<IEmployee> & { id: string }
}
export interface IGetEmployeeInput {
  input: {
    id: string
  }
}

export interface IGetEmployeesInput {
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

export const EmployeeModel = mongoose.model<IEmployee & Document>(
  'Employee',
  EmployeeSchema,
  'employees',
)
