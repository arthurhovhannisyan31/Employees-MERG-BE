// model
import { IAuthRequest } from '../../../models/auth'
import {
  ICreateEmployeeInput,
  IUpdateEmployeeInput,
  IGetEmployeeInput,
  IGetEmployeesInput,
} from '../../../models/employee'
// helpers
import { Employee } from '../../../models'
import { transformEmployee } from './helpers'
import { authCheck } from '../../utils/helpers'

export const employees = async (
  { input }: IGetEmployeesInput,
  req: IAuthRequest,
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
  req: IAuthRequest,
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
  { input }: ICreateEmployeeInput,
  req: IAuthRequest,
) => {
  authCheck(req)
  try {
    const duplicate = await Employee.findOne({
      first_name: input.first_name,
      last_name: input.last_name,
    })
    if (duplicate) {
      throw new Error(
        `Employee name:${input.first_name}, ${input.last_name} already exists`,
      )
    }
    const employee = new Employee(input)
    const result = await employee.save()
    return transformEmployee(result)
  } catch (err) {
    throw err
  }
}

export const updateEmployee = async (
  { input: props }: IUpdateEmployeeInput,
  req: IAuthRequest,
) => {
  authCheck(req)
  try {
    const { id, ...updateProps } = props
    const employee = await Employee.findOneAndUpdate({ _id: id }, updateProps, {
      new: true,
    })
    if (!employee) {
      throw new Error(`Employee by id: ${id} does not exists`)
    }
    return transformEmployee(employee)
  } catch (err) {
    throw err
  }
}

export const deleteEmployee = async () => {
  return null
}
