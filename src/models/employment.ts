import mongoose, { Schema } from 'mongoose'

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
  },
  end_date: {
    type: String,
    required: true,
  },
})

export const EmploymentModel = mongoose.model(
  'Employment',
  EmploymentSchema,
  'employment_history'
)
