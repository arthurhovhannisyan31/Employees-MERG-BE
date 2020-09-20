import mongoose, { Schema } from 'mongoose'

const EmployeeTitleSchema = new Schema({
  employee: {
    type: Schema.Types.ObjectId,
    ref: 'Employee',
  },
  title: {
    type: Schema.Types.ObjectId,
    ref: 'Title',
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

export const EmployeeTitleModel = mongoose.model(
  'EmployeeTitle',
  EmployeeTitleSchema,
  'employees_title_history'
)
