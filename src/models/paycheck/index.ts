import mongoose, { Document, Schema } from 'mongoose'

import { defaultFields } from '../../utils/model'
import { Paycheck } from '../generated'

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
  ...defaultFields,
})

export const PaycheckModel = mongoose.model<Paycheck & Document>(
  'Paycheck',
  PaycheckSchema,
  'paychecks'
)
