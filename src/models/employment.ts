// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { IEmployee, IEmployeeResponse } from './employee'
import { IDepartment } from './departmnet'

export interface IEmployment {
  _id: string
  employee: IEmployee
  department: IDepartment
  start_date: string
  end_date: string
}

export interface IEmploymentResponse {
  _id: string
  employee: IEmployeeResponse
  department: IDepartment
  start_date: string
  end_date: string
}

export interface ICreateEmploymentInput {
  input: IEmployment
}

const EmploymentSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
  },
  start_date: {
    type: String,
    required: true,
    trim: true,
  },
  end_date: {
    type: String,
    required: true,
    trim: true,
  },
})

export const EmploymentModel = mongoose.model<IEmployment & Document>(
  'Employment',
  EmploymentSchema,
  'employment_history',
)
