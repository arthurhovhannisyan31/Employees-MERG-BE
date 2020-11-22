// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers
import { IGender } from './gender'
import { IDepartment } from './departmnet'

export interface IEmployee extends Document {
  birth_date: string
  first_name: string
  last_name: string
  gender: IGender
  hire_date: string
  department: IDepartment
}

export interface ICreateEmployeeInput {
  input: IEmployee
}
export interface IGetEmployeeInput {
  input: {
    id: string
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
})

export const EmployeeModel = mongoose.model<IEmployee>(
  'Employee',
  EmployeeSchema,
  'employees'
)
