// deps
import DataLoader from 'dataloader'
// model
import { Employee } from '../../../models'
import { IEmployee } from '../../../models/employee'
// helpers
import { getSingleGender } from '../gender/helpers'
import { getSingleDepartment } from '../departments/helpers'
import { getSingleTitle } from '../title/helpers'
import { getPaycheckByEmployee } from '../paycheck/helpers'
import { getEmployeeTitlesByEmployee } from '../employeeTitle/helpers'
import { getEmploymentsByEmployee } from '../employments/helpers'

// @ts-ignore
export const employeeLoader = new DataLoader((ids: string[]) =>
  getEmployees(ids)
)

export const getEmployees = async (ids: string[]) => {
  try {
    const employees = await Employee.find({ _id: { $in: ids } })
    employees.sort(
      (a: IEmployee, b: IEmployee) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
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
    gender: getSingleGender((gender as never) as string),
    hire_date,
    department: getSingleDepartment((department as never) as string),
    title: getSingleTitle((title as never) as string),
    paychecks: getPaycheckByEmployee((_id as never) as string),
    titles: getEmployeeTitlesByEmployee((_id as never) as string),
    employments: getEmploymentsByEmployee((_id as never) as string),
  }
}
