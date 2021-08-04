// deps
import DataLoader from 'dataloader'
// model
import { EmployeeModel } from '../../../models'
import { EmployeeExtended } from '../../../models/employee'
import { Employee } from '../../../models/generated'
// helpers
import { getPaycheckByEmployee } from '../paycheck/helpers'
import { getEmployeeTitlesByEmployee } from '../employeeTitle/helpers'
import { getEmploymentsByEmployee } from '../employments/helpers'

export const employeeLoader = new DataLoader(
  (ids): Promise<Promise<EmployeeExtended>[]> => getEmployees(ids as string[])
)

export const getEmployees = async (
  ids: string[]
): Promise<Promise<EmployeeExtended>[]> => {
  const employees = await EmployeeModel.find({ _id: { $in: ids } })
  employees.sort(
    (a: Employee, b: Employee) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return employees.map(transformEmployee)
}

export const getSingleEmployee = async (
  id: string
): Promise<EmployeeExtended> => {
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
}: Employee): Promise<EmployeeExtended> => ({
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
