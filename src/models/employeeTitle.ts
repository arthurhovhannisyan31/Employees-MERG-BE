// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IEmployeeTitle } from '../types'

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
  'employees_title_history'
)
