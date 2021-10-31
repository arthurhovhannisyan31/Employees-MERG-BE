import mongoose, { Document, Schema } from 'mongoose'

import { EmployeeExtended } from './employee'
import { Employment, Department } from './generated'

export interface EmploymentResponse {
  _id: string
  employee: EmployeeExtended
  department: Department
  start_date: string
  end_date: string
}

export interface CreateEmploymentInput {
  input: Employment
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

export const EmploymentModel = mongoose.model<Employment & Document>(
  'Employment',
  EmploymentSchema,
  'employment_history'
)
