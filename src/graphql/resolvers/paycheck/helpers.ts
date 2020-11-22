// deps
import DataLoader from 'dataloader'
// local
import { Paycheck } from '../../../models'
import { getSingleEmployee } from '../employees/helpers'
// helpers
import { IPaycheck } from '../../../models/paycheck'

// @ts-ignore
export const paycheckLoader = new DataLoader((ids: string[]) =>
  getPaycheckHistory(ids)
)

export const getPaycheckHistory = async (ids: string[]) => {
  try {
    const paycheckHistory = await Paycheck.find({ _id: { $in: ids } })
    paycheckHistory.sort(
      (a: IPaycheck, b: IPaycheck) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    )
    return paycheckHistory.map(transformPaycheck)
  } catch (err) {
    throw err
  }
}

export const getSinglePaycheck = async (id: string) => {
  try {
    const paycheck = await paycheckLoader.load(id.toString())
    if (!paycheck) {
      throw new Error('Paycheck not found')
    }
    return paycheck
  } catch (err) {
    throw err
  }
}

export const transformPaycheck = ({
  _id,
  employee,
  salary,
  start_date,
  end_date,
}: IPaycheck) => ({
  _id,
  employee: getSingleEmployee((employee as never) as string),
  salary,
  start_date,
  end_date,
})
