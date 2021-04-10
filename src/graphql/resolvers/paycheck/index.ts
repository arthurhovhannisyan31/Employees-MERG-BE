// model
import { Paycheck } from '../../../models'
import { ICreatePaycheckInput } from '../../../models/paycheck'
import { QueryOptions } from '../../../models/common'
// helpers
import { transformPaycheck } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const paycheckHistory = async (_: never, { req }: QueryOptions) => {
  authCheck(req)
  try {
    const result = await Paycheck.find()
    return result.map(transformPaycheck)
  } catch (err) {
    throw err
  }
}

export const createPaycheck = async (
  { input: { employee, salary, start_date, end_date } }: ICreatePaycheckInput,
  { req }: QueryOptions,
) => {
  authCheck(req)
  try {
    const duplicate = await Paycheck.findOne({
      employee,
      salary,
      start_date,
      end_date,
    })
    if (duplicate) {
      throw new Error(
        `Paycheck for period ${start_date}-${end_date} for employee ${employee} for amount ${salary} already exist`,
      )
    }
    const paycheck = new Paycheck({
      employee,
      salary,
      start_date,
      end_date,
    })
    const result = await paycheck.save()
    return transformPaycheck(result)
  } catch (err) {
    throw err
  }
}
