import { EmploymentModel } from '../../../models'
import { QueryContext } from '../../../models/common'
import {
  CreateEmploymentInput,
  EmploymentResponse,
} from '../../../models/employment'
import { authCheck } from '../../../utils/helpers'
import { transformEmployment } from './helpers'

export const employments = async (
  _: never,
  { req }: QueryContext
): Promise<Promise<EmploymentResponse>[]> => {
  authCheck(req)
  const result = await EmploymentModel.find()
  return result.map(transformEmployment)
}

export const createEmployment = async (
  {
    input: { employee, department, start_date, end_date },
  }: CreateEmploymentInput,
  { req }: QueryContext
): Promise<EmploymentResponse> => {
  authCheck(req)
  const duplicate = await EmploymentModel.findOne({
    employee,
    department,
    start_date,
    end_date,
  })
  if (duplicate) {
    throw new Error(`Record already exists`)
  }
  const employment = new EmploymentModel({
    employee,
    department,
    start_date,
    end_date,
  })
  const result = await employment.save()
  return transformEmployment(result)
}
