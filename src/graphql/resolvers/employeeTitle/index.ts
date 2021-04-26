// model
import { EmployeeTitle } from '../../../models'
import {
  ICreateEmployeeTitleInput,
  IEmployeeTitle,
} from '../../../models/employeeTitle'
import { IAuthRequest } from '../../../models/auth'
import { QueryContext } from '../../../models/common'
// helpers
import { transformEmployeeTitle } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const employeesTitles = async (
  _: never,
  req: IAuthRequest,
): Promise<Promise<IEmployeeTitle>[]> => {
  authCheck(req)
  const result = await EmployeeTitle.find()
  return result.map(transformEmployeeTitle)
}

export const createEmployeeTitle = async (
  {
    input: { employee, title, start_date, end_date },
  }: ICreateEmployeeTitleInput,
  { req }: QueryContext,
): Promise<IEmployeeTitle> => {
  authCheck(req)
  const duplicate = await EmployeeTitle.findOne({
    employee,
    title,
    start_date,
    end_date,
  })
  if (duplicate) {
    throw new Error(`Employee ${employee} title ${title} record already exists`)
  }
  const employeeTitle = new EmployeeTitle({
    employee,
    title,
    start_date,
    end_date,
  })
  const result = await employeeTitle.save()
  return transformEmployeeTitle(result)
}
