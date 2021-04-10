// deps
import mongoose, { Document, Schema } from 'mongoose'
// model
import { IEmployee } from './employee'

export interface IPaycheck {
  _id: string
  employee: IEmployee
  salary: number
  start_date: string
  end_date: string
}

export interface ICreatePaycheckInput {
  input: IPaycheck
}

export interface IGetPaychecksInput {
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

export const PaycheckModel = mongoose.model<IPaycheck & Document>(
  'Paycheck',
  PaycheckSchema,
  'paychecks',
)
