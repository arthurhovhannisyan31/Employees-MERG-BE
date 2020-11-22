// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers

export interface IDepartment extends Document {
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

export const DepartmentModel = mongoose.model<IDepartment>(
  'Department',
  DepartmentSchema,
  'departments'
)
