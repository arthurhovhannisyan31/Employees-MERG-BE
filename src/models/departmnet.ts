// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IDepartment } from '../types'

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export const DepartmentModel = mongoose.model<IDepartment>(
  'Department',
  DepartmentSchema,
  'departments'
)
