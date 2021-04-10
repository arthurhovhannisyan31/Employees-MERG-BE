// model
import { Employment } from '../../../models'
import { ICreateEmploymentInput } from '../../../models/employment'
import { QueryOptions } from '../../../models/common'
// helpers
import { transformEmployment } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const employments = async (_: never, { req }: QueryOptions) => {
  authCheck(req)
  try {
    const result = await Employment.find()
    return result.map(transformEmployment)
  } catch (err) {
    throw err
  }
}

export const createEmployment = async (
  {
    input: { employee, department, start_date, end_date },
  }: ICreateEmploymentInput,
  { req }: QueryOptions,
) => {
  try {
    authCheck(req)
    const duplicate = await Employment.findOne({
      employee,
      department,
      start_date,
      end_date,
    })
    if (duplicate) {
      throw new Error(`Record already exists`)
    }
    const employment = new Employment({
      employee,
      department,
      start_date,
      end_date,
    })
    const result = await employment.save()
    return transformEmployment(result)
  } catch (err) {
    throw err
  }
}
