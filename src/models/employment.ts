// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Employee, EmployeeResponse } from './employee'
import { Department } from './departmnet'

export interface Employment {
  _id: string
  employee: Employee
  department: Department
  start_date: string
  end_date: string
}

export interface EmploymentResponse {
  _id: string
  employee: EmployeeResponse
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
