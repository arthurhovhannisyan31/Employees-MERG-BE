import DataLoader from 'dataloader'

import { PaycheckModel } from '../../../models'
import { Employee, Paycheck } from '../../../models/generated'
import { getSingleEmployee } from '../employees/helpers'

export const paycheckLoader = new DataLoader(
  (ids): Promise<Promise<Paycheck>[]> => getPaycheckHistory(ids as string[])
)

export const getPaycheckHistory = async (
  ids: string[]
): Promise<Promise<Paycheck>[]> => {
  const paycheckHistory = await PaycheckModel.find({ _id: { $in: ids } })
  paycheckHistory.sort(
    (a: Paycheck, b: Paycheck) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return paycheckHistory.map(transformPaycheck)
}

export const getPaycheckByEmployee = async (
  id: string
): Promise<Promise<Paycheck>[]> => {
  const paycheckHistory = await PaycheckModel.find({
    employee: id as never as Employee,
  })
  return paycheckHistory.map(transformPaycheck)
}

export const getSinglePaycheck = async (id: string): Promise<Paycheck> => {
  const paycheck = await paycheckLoader.load(id.toString())
  if (!paycheck) {
    throw new Error('Paycheck not found')
  }
  return paycheck
}

export const transformPaycheck = async ({
  _id,
  employee,
  salary,
  start_date,
  end_date,
}: Paycheck): Promise<Paycheck> => ({
  _id,
  salary,
  start_date,
  end_date,
  employee: await getSingleEmployee(employee as never as string),
})
