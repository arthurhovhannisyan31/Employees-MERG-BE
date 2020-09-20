import mongoose, { Schema } from 'mongoose'

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
  },
  end_date: {
    type: String,
    required: true,
  },
})

export const PaycheckModel = mongoose.model(
  'Paycheck',
  PaycheckSchema,
  'paychecks'
)
