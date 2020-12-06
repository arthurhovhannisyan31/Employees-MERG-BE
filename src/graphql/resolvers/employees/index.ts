// model
import { IAuthRequest } from '../../../models/auth'
import {
  ICreateEmployeeInput,
  IGetEmployeeInput,
  IGetEmployeesInput,
} from '../../../models/employee'
// helpers
import { Employee } from '../../../models'
import { transformEmployee } from './helpers'
import { authCheck } from '../../utils/helpers'

export const employees = async (
  { input }: IGetEmployeesInput,
  req: IAuthRequest
) => {
  authCheck(req)
  try {
    const { limit = 100, offset = 0 } = input || {}
    const result = await Employee.find().limit(limit).skip(offset)
    const count = await Employee.countDocuments()
    return {
      nodes: result.map(transformEmployee),
      count: count,
    }
  } catch (err) {
    throw err
  }
}
export const employee = async (
  { input: { id } }: IGetEmployeeInput,
  req: IAuthRequest
) => {
  authCheck(req)
  try {
    const result = await Employee.findOne({ _id: id })
    if (!result) {
      throw new Error(`Employee ${id} was not found`)
    }
    return transformEmployee(result)
  } catch (err) {
    throw err
  }
}
export const createEmployee = async (
  {
    input: {
      birth_date,
      first_name,
      last_name,
      gender,
      hire_date,
      department,
      title,
    },
  }: ICreateEmployeeInput,
  req: IAuthRequest
) => {
  authCheck(req)
  try {
    const duplicate = await Employee.findOne({
      birth_date,
      first_name,
      last_name,
      gender,
      hire_date,
      department,
      title,
    })
    if (duplicate) {
      throw new Error(
        `Employee name:${first_name}, ${last_name} already exists`
      )
    }
    const employee = new Employee({
      birth_date,
      first_name,
      last_name,
      gender,
      hire_date,
      department,
      title,
    })
    const result = await employee.save()
    return transformEmployee(result)
  } catch (err) {
    throw err
  }
}

export const updateEmployee = async () => {
  return null
}

export const deleteEmployee = async () => {
  return null
}
