// deps
import DataLoader from 'dataloader'
// model
import { Paycheck } from '../../../models'
import { IEmployee } from '../../../models/employee'
import { IPaycheck } from '../../../models/paycheck'
// helpers
import { getSingleEmployee } from '../employees/helpers'

export const paycheckLoader = new DataLoader(
  (ids): Promise<Promise<IPaycheck>[]> => getPaycheckHistory(ids as string[]),
)

export const getPaycheckHistory = async (
  ids: string[],
): Promise<Promise<IPaycheck>[]> => {
  const paycheckHistory = await Paycheck.find({ _id: { $in: ids } })
  paycheckHistory.sort(
    (a: IPaycheck, b: IPaycheck) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()),
  )
  return paycheckHistory.map(transformPaycheck)
}

export const getPaycheckByEmployee = async (
  id: string,
): Promise<Promise<IPaycheck>[]> => {
  const paycheckHistory = await Paycheck.find({
    employee: (id as never) as IEmployee,
  })
  return paycheckHistory.map(transformPaycheck)
}

export const getSinglePaycheck = async (id: string): Promise<IPaycheck> => {
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
}: IPaycheck): Promise<IPaycheck> => ({
  _id,
  salary,
  start_date,
  end_date,
  employee: await getSingleEmployee((employee as never) as string),
})
