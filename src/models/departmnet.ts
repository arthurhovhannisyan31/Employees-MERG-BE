// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface Department {
  _id: string
  name: string
}

export interface CreateDepartmentInput {
  input: Department
}

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
