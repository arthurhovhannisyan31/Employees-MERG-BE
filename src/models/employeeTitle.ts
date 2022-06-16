import mongoose, { Document, Schema } from 'mongoose'

import { defaultFields } from '../utils/model'
import { EmployeeTitle } from './generated'

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
  ...defaultFields,
})

export const EmployeeTitleModel = mongoose.model<EmployeeTitle & Document>(
  'EmployeeTitle',
  EmployeeTitleSchema,
  'employees_title_history'
)
