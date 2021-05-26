// model
import { Employment } from '../../../models'
import {
  ICreateEmploymentInput,
  IEmploymentResponse,
} from '../../../models/employment'
import { QueryContext } from '../../../models/common'
// helpers
import { transformEmployment } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const employments = async (
  _: never,
  { req }: QueryContext
): Promise<Promise<IEmploymentResponse>[]> => {
  authCheck(req)
  const result = await Employment.find()
  return result.map(transformEmployment)
}

export const createEmployment = async (
  {
    input: { employee, department, start_date, end_date },
  }: ICreateEmploymentInput,
  { req }: QueryContext
): Promise<IEmploymentResponse> => {
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
}
