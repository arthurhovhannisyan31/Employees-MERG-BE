// deps
import { Employee } from '../../models'
// local
// helpers
import { transformEmployee } from './helpers'
import { IEmployeeInput } from '../../types'

export const employees = async () => {
  try {
    const result = await Employee.find()
    return result.map(transformEmployee)
  } catch (err) {
    throw err
  }
}

export const createEmployee = async ({
  input: { birth_date, first_name, last_name, gender },
}: IEmployeeInput) => {
  // if (!req.isAuth) {
  //   throw new Error('Unauthenticated request')
  // }
  try {
    const duplicate = await Employee.findOne({
      birth_date,
      first_name: first_name.toLowerCase(),
      last_name: last_name.toLowerCase(),
      gender,
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
    })
    const result = await employee.save()
    return transformEmployee(result)
  } catch (err) {
    throw err
  }
}
