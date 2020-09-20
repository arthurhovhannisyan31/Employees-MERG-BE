// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IEmployee } from '../types'

const EmployeeSchema = new Schema({
  birth_date: {
    type: String,
    required: true,
    trim: true,
  },
  first_name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'Gender',
  },
})

export const EmployeeModel = mongoose.model<IEmployee>(
  'Employee',
  EmployeeSchema,
  'employees'
)
