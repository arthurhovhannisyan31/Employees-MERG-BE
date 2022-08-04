import mongoose, { Document, Schema } from 'mongoose'

import { Department } from '../generated'

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export const DepartmentModel = mongoose.model<Department & Document>(
  'Department',
  DepartmentSchema,
  'departments'
)
