// deps
// local
import { EmployeeTitle } from '../../../models'
// helpers
import { transformEmployeeTitle } from './helpers'
import { ICreateEmployeeTitleInput } from '../../../models/employeeTitle'
import { IAuthRequest } from '../../../models/auth'
import { authCheck } from '../../../utils/helpers'

export const employeesTitles = async (_: never, req: IAuthRequest) => {
  authCheck(req)
  try {
    const result = await EmployeeTitle.find()
    return result.map(transformEmployeeTitle)
  } catch (err) {
    throw err
  }
}

export const createEmployeeTitle = async (
  {
    input: { employee, title, start_date, end_date },
  }: ICreateEmployeeTitleInput,
  req: IAuthRequest,
) => {
  authCheck(req)
  try {
    const duplicate = await EmployeeTitle.findOne({
      employee,
      title,
      start_date,
      end_date,
    })
    if (duplicate) {
      throw new Error(
        `Employee ${employee} title ${title} record already exists`,
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
