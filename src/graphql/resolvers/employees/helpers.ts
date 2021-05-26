// deps
import DataLoader from 'dataloader'
// model
import { Employee } from '../../../models'
import { IEmployee, IEmployeeResponse } from '../../../models/employee'
// helpers
import { getPaycheckByEmployee } from '../paycheck/helpers'
import { getEmployeeTitlesByEmployee } from '../employeeTitle/helpers'
import { getEmploymentsByEmployee } from '../employments/helpers'

export const employeeLoader = new DataLoader(
  (ids): Promise<Promise<IEmployeeResponse>[]> => getEmployees(ids as string[])
)

export const getEmployees = async (
  ids: string[]
): Promise<Promise<IEmployeeResponse>[]> => {
  const employees = await Employee.find({ _id: { $in: ids } })
  employees.sort(
    (a: IEmployee, b: IEmployee) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return employees.map(transformEmployee)
}

export const getSingleEmployee = async (
  id: string
): Promise<IEmployeeResponse> => {
  const employee = await employeeLoader.load(id.toString())
  if (!employee) throw new Error('Employee not found')
  return employee
}
export const transformEmployee = async ({
  _id,
  birth_date,
  first_name,
  last_name,
  gender,
  hire_date,
  department,
  title,
}: IEmployee): Promise<IEmployeeResponse> => ({
  _id,
  birth_date,
  first_name,
  last_name,
  gender,
  hire_date,
  department,
  title,
  paychecks: await getPaycheckByEmployee(_id),
  titles: await getEmployeeTitlesByEmployee(_id),
  employments: await getEmploymentsByEmployee(_id),
})
