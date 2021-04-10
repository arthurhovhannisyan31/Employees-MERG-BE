// deps
import DataLoader from 'dataloader'
// model
import { IEmployeeTitle } from '../../../models/employeeTitle'
import { EmployeeTitle } from '../../../models'
import { IEmployee } from '../../../models/employee'
// helpers
import { getSingleEmployee } from '../employees/helpers'
import { getSingleTitle } from '../title/helpers'

export const employeeTitleLoader = new DataLoader((ids) =>
  getEmployeeTitles((ids as unknown) as string),
)

export const getEmployeeTitles = async (
  ids: string,
): Promise<Promise<IEmployeeTitle>[]> => {
  const employeesTitles = await EmployeeTitle.find({ _id: { $in: ids } })
  employeesTitles.sort(
    (a: IEmployeeTitle, b: IEmployeeTitle) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()),
  )
  return employeesTitles.map(transformEmployeeTitle)
}

export const getEmployeeTitlesByEmployee = async (
  id: string,
): Promise<Promise<IEmployeeTitle>[]> => {
  const employeeTitles = await EmployeeTitle.find({
    employee: (id as never) as IEmployee,
  })
  return employeeTitles.map(transformEmployeeTitle)
}

export const getSingleEmployeeTitle = async (
  id: string,
): Promise<IEmployeeTitle> => {
  const employeeTitle = await employeeTitleLoader.load(id.toString())
  if (!employeeTitle)
    throw new Error(`Employee ${id} title record does not exist `)
  return employeeTitle
}

export const transformEmployeeTitle = async ({
  _id,
  employee,
  title,
  start_date,
  end_date,
}: IEmployeeTitle): Promise<IEmployeeTitle> => ({
  _id,
  employee: await getSingleEmployee((employee as never) as string),
  title: await getSingleTitle((title as never) as string),
  start_date,
  end_date,
})
