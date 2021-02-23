// deps
import mongoose, { Document, Schema } from 'mongoose'
// local
// helpers
import { IEmployee } from './employee'
import { IDepartment } from './departmnet'

export interface IEmployment extends Document {
  employee: IEmployee
  department: IDepartment
  start_date: string
  end_date: string
}

export interface ICreateEmploymentInput {
  input: IEmployment
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

export const EmploymentModel = mongoose.model<IEmployment>(
  'Employment',
  EmploymentSchema,
  'employment_history',
)
