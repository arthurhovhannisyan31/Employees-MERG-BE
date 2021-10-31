import { EmployeeTitleModel } from '../../../models'
import { AuthRequest } from '../../../models/auth'
import { QueryContext } from '../../../models/common'
import { CreateEmployeeTitleInput } from '../../../models/employeeTitle'
import { EmployeeTitle } from '../../../models/generated'
import { authCheck } from '../../../utils/helpers'
import { transformEmployeeTitle } from './helpers'

export const employeesTitles = async (
  _: never,
  req: AuthRequest
): Promise<Promise<EmployeeTitle>[]> => {
  authCheck(req)
  const result = await EmployeeTitleModel.find()
  return result.map(transformEmployeeTitle)
}

export const createEmployeeTitle = async (
  {
    input: { employee, title, start_date, end_date },
  }: CreateEmployeeTitleInput,
  { req }: QueryContext
): Promise<EmployeeTitle> => {
  authCheck(req)
  const duplicate = await EmployeeTitleModel.findOne({
    employee,
    title,
    start_date,
    end_date,
  })
  if (duplicate) {
    throw new Error(`Employee ${employee} title ${title} record already exists`)
  }
  const employeeTitle = new EmployeeTitleModel({
    employee,
    title,
    start_date,
    end_date,
  })
  const result = await employeeTitle.save()
  return transformEmployeeTitle(result)
}
