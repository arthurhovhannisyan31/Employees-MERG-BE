// deps
import mongoose, { Document, Schema } from 'mongoose'

export interface IDepartment {
  _id: string
  name: string
}

export interface ICreateDepartmentInput {
  input: IDepartment
}

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
})

export const DepartmentModel = mongoose.model<IDepartment & Document>(
  'Department',
  DepartmentSchema,
  'departments'
)
