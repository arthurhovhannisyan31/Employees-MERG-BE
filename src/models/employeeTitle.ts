// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { IEmployee } from './employee'
import { ITitle } from './title'

export interface IEmployeeTitle {
  _id: string
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

export const EmployeeTitleModel = mongoose.model<IEmployeeTitle & Document>(
  'EmployeeTitle',
  EmployeeTitleSchema,
  'employees_title_history',
)
