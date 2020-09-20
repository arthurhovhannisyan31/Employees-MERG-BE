import mongoose, { Schema } from 'mongoose'

const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
})

export const DepartmentModel = mongoose.model(
  'Title',
  DepartmentSchema,
  'departments'
)
