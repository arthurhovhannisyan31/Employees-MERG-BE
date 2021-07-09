// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { Employee } from './employee'

export interface Paycheck {
  _id: string
  employee: Employee
  salary: number
  start_date: string
  end_date: string
}

export interface CreatePaycheckInput {
  input: Paycheck
}

export interface GetPaychecksInput {
  input: {
    id: string
    start_date: string
    end_date: string
  }
}

const PaycheckSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  salary: {
    type: Number,
    required: true,
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

export const PaycheckModel = mongoose.model<Paycheck & Document>(
  'Paycheck',
  PaycheckSchema,
  'paychecks'
)
