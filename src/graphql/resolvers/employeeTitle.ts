// deps
import { EmployeeTitle } from '../../models'
// local
// helpers
import { transformEmployeeTitle } from './helpers'
import { IEmployeeTitleInput } from '../../types'

export const employeesTitles = async () => {
  try {
    const result = await EmployeeTitle.find()
    return result.map(transformEmployeeTitle)
  } catch (err) {
    throw err
  }
}

export const createEmployeeTitle = async ({
  input: { employee, title, start_date, end_date },
}: IEmployeeTitleInput) => {
  // if (!req.isAuth) {
  //   throw new Error('Unauthenticated request')
  // }
  try {
    const duplicate = await EmployeeTitle.findOne({
      employee,
      title,
      start_date,
      end_date,
    })
    if (duplicate) {
      throw new Error(
        `Employee ${employee} title ${title} record already exists`
      )
    }
    const employeeTitle = new EmployeeTitle({
      employee,
      title,
      start_date,
      end_date,
    })
    const result = await employeeTitle.save()
    return transformEmployeeTitle(result)
  } catch (err) {
    throw err
  }
}
