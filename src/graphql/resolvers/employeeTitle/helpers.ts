// deps
import DataLoader from 'dataloader'
// model
import { EmployeeTitle } from '../../../models/generated'
import { EmployeeTitleModel } from '../../../models'
import { Employee } from '../../../models/generated'
// helpers
import { getSingleEmployee } from '../employees/helpers'
import { getSingleTitle } from '../title/helpers'

export const employeeTitleLoader = new DataLoader((ids) =>
  getEmployeeTitles(ids as unknown as string)
)

export const getEmployeeTitles = async (
  ids: string
): Promise<Promise<EmployeeTitle>[]> => {
  const employeesTitles = await EmployeeTitleModel.find({ _id: { $in: ids } })
  employeesTitles.sort(
    (a: EmployeeTitle, b: EmployeeTitle) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return employeesTitles.map(transformEmployeeTitle)
}

export const getEmployeeTitlesByEmployee = async (
  id: string
): Promise<Promise<EmployeeTitle>[]> => {
  const employeeTitles = await EmployeeTitleModel.find({
    employee: id as never as Employee,
  })
  return employeeTitles.map(transformEmployeeTitle)
}

export const getSingleEmployeeTitle = async (
  id: string
): Promise<EmployeeTitle> => {
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
}: EmployeeTitle): Promise<EmployeeTitle> => ({
  _id,
  employee: await getSingleEmployee(employee as never as string),
  title: await getSingleTitle(title as never as string),
  start_date,
  end_date,
})
