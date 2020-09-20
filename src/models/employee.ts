import mongoose, { Schema } from 'mongoose'

const EmployeeSchema = new Schema({
  birth_date: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: Schema.Types.ObjectId,
    ref: 'Gender',
  },
})

export const EmployeeModel = mongoose.model(
  'Employee',
  EmployeeSchema,
  'employees'
)
