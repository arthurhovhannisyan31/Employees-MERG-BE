// model
import { PaycheckModel } from '../../../models'
import { CreatePaycheckInput } from '../../../models/paycheck'
import { QueryContext } from '../../../models/common'
import { Paycheck } from '../../../models/generated'
// helpers
import { transformPaycheck } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const paycheckHistory = async (
  _: never,
  { req }: QueryContext
): Promise<Promise<Paycheck>[]> => {
  authCheck(req)
  const result = await PaycheckModel.find()
  return result.map(transformPaycheck)
}

export const createPaycheck = async (
  { input: { employee, salary, start_date, end_date } }: CreatePaycheckInput,
  { req }: QueryContext
): Promise<Paycheck> => {
  authCheck(req)
  const duplicate = await PaycheckModel.findOne({
    employee,
    salary,
    start_date,
    end_date,
  })
  if (duplicate) {
    throw new Error(
      `Paycheck for period ${start_date}-${end_date} for employee ${employee} for amount ${salary} already exist`
    )
  }
  const paycheck = new PaycheckModel({
    employee,
    salary,
    start_date,
    end_date,
  })
  const result = await paycheck.save()
  return transformPaycheck(result)
}
