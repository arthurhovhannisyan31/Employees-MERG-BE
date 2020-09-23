// deps
import {} from 'mongoose'
import { Employee } from '../../models'
// local
// helpers
import { transformEmployee } from './helpers'
import { IAuthRequest, IEmployeeInput } from '../../types'
import { authCheck } from '../utils/helpers'

export const employees = async () => {
  try {
    const result = await Employee.find()
    return result.map(transformEmployee)
  } catch (err) {
    throw err
  }
}

export const createEmployee = async (
  {
    input: { birth_date, first_name, last_name, gender, hire_date },
  }: IEmployeeInput,
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
