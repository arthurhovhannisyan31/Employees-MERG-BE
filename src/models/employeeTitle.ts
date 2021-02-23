// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers
import { IEmployee } from './employee'
import { ITitle } from './title'

export interface IEmployeeTitle extends Document {
  employee: IEmployee
  title: ITitle
  start_date: string
  end_date: string
}

export interface ICreateEmployeeTitleInput {
  input: IEmployeeTitle
}

const EmployeeTitleSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  title: {
    type: Schema.Types.ObjectId,
    ref: 'Title',
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

export const EmployeeTitleModel = mongoose.model<IEmployeeTitle>(
  'EmployeeTitle',
  EmployeeTitleSchema,
  'employees_title_history',
)
