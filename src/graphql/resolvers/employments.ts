// deps
import { Employment } from '../../models'
// local
// helpers
import { transformEmployment } from './helpers'
import { IAuthRequest, IEmploymentInput } from '../../types'
import { authCheck } from '../utils/helpers'

export const employments = async () => {
  try {
    const result = await Employment.find()
    return result.map(transformEmployment)
  } catch (err) {
    throw err
  }
}

export const createEmployment = async (
  { input: { employee, department, start_date, end_date } }: IEmploymentInput,
  req: IAuthRequest
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
