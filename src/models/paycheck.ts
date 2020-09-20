// deps
import mongoose, { Schema } from 'mongoose'
// local
// helpers
import { IPaycheck } from '../types'

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

export const PaycheckModel = mongoose.model<IPaycheck>(
  'Paycheck',
  PaycheckSchema,
  'paychecks'
)
