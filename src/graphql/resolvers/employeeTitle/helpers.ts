// deps
import DataLoader from 'dataloader'
// model
import { IEmployeeTitle } from '../../../models/employeeTitle'
import { EmployeeTitle } from '../../../models'
import { IEmployee } from '../../../models/employee'
// helpers
import { getSingleEmployee } from '../employees/helpers'
import { getSingleTitle } from '../title/helpers'

// @ts-ignore
export const employeeTitleLoader = new DataLoader((ids: string) =>
  getEmployeeTitles(ids)
)

export const getEmployeeTitles = async (ids: string) => {
  try {
    const employeesTitles = await EmployeeTitle.find({ _id: { $in: ids } })
    employeesTitles.sort(
      (a: IEmployeeTitle, b: IEmployeeTitle) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    )
    return employeesTitles.map(transformEmployeeTitle)
  } catch (err) {
    throw err
  }
}

export const getEmployeeTitlesByEmployee = async (
  id: string
): Promise<IEmployeeTitle[]> => {
  try {
    const employeeTitles = await EmployeeTitle.find({
      employee: (id as never) as IEmployee,
    })
    // @ts-ignore
    return employeeTitles.map(transformEmployeeTitle)
  } catch (err) {
    throw err
  }
}

export const getSingleEmployeeTitle = async (id: string) => {
  try {
    const employeeTitle = await employeeTitleLoader.load(id.toString())
    if (!employeeTitle)
      throw new Error(`Employee ${id} title record does not exist `)
    return employeeTitle
  } catch (err) {
    throw err
  }
}

export const transformEmployeeTitle = ({
  _id,
  employee,
  title,
  start_date,
  end_date,
}: IEmployeeTitle) => ({
  _id,
  employee: getSingleEmployee((employee as never) as string),
  title: getSingleTitle((title as never) as string),
  start_date,
  end_date,
})
