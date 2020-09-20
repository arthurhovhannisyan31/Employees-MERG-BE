// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IEmployment } from '../types'

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

export const EmploymentModel = mongoose.model<IEmployment>(
  'Employment',
  EmploymentSchema,
  'employment_history'
)
