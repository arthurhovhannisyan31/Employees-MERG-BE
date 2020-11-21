// deps
// local
import { Employee } from '../../../models'
// helpers
import { transformEmployee } from './helpers'
import {
  IAuthRequest,
  ICreateEmployeeInput,
  IGetEmployeeInput,
} from '../../../types'
import { authCheck } from '../../utils/helpers'

export const employees = async (_: never, req: IAuthRequest) => {
  authCheck(req)
  try {
    const result = await Employee.find()
    return result.map(transformEmployee)
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
    input: { birth_date, first_name, last_name, gender, hire_date },
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
    })
    const result = await employee.save()
    return transformEmployee(result)
  } catch (err) {
    throw err
  }
}
