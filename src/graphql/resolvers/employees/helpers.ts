// deps
import DataLoader from 'dataloader'
// model
import { Employee } from '../../../models'
import { IEmployee } from '../../../models/employee'
// helpers
import { getPaycheckByEmployee } from '../paycheck/helpers'
import { getEmployeeTitlesByEmployee } from '../employeeTitle/helpers'
import { getEmploymentsByEmployee } from '../employments/helpers'

export const employeeLoader = new DataLoader((ids) =>
  getEmployees(ids as string[]),
)

export const getEmployees = async (ids: string[]) => {
  try {
    const employees = await Employee.find({ _id: { $in: ids } })
    employees.sort(
      (a: IEmployee, b: IEmployee) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()),
    )
    return employees.map(transformEmployee)
  } catch (err) {
    throw err
  }
}

export const getSingleEmployee = async (id: string) => {
  try {
    const employee = await employeeLoader.load(id.toString())
    if (!employee) throw new Error('Employee not found')
    return employee
  } catch (err) {
    throw err
  }
}
export const transformEmployee = ({
  _id,
  last_name,
  gender,
  first_name,
  birth_date,
  hire_date,
  department,
  title,
}: IEmployee) => {
  return {
    _id,
    birth_date,
    first_name,
    last_name,
    gender,
    hire_date,
    department,
    title,
    paychecks: getPaycheckByEmployee((_id as never) as string),
    titles: getEmployeeTitlesByEmployee((_id as never) as string),
    employments: getEmploymentsByEmployee((_id as never) as string),
  }
}
