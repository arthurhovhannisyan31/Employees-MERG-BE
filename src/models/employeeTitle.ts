// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Employee } from './employee'
import { Title } from './title'

export interface EmployeeTitle {
  _id: string
  employee: Employee
  title: Title
  start_date: string
  end_date: string
}

export interface CreateEmployeeTitleInput {
  input: EmployeeTitle
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

export const EmployeeTitleModel = mongoose.model<EmployeeTitle & Document>(
  'EmployeeTitle',
  EmployeeTitleSchema,
  'employees_title_history'
)
