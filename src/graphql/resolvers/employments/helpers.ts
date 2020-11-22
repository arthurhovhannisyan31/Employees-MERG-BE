// deps
import DataLoader from 'dataloader'
// local
import { Employment } from '../../../models'
import { getSingleEmployee, employeeLoader } from '../employees/helpers'
import { getSingleDepartment } from '../departments/helpers'
// helpers
import { IEmployment } from '../../../models/employment'

// @ts-ignore
export const employmentLoader = new DataLoader((ids: string[]) =>
  getEmployments(ids)
)

export const getEmployments = async (ids: string[]) => {
  try {
    const employments = await Employment.find({ _id: { $in: ids } })
    employments.sort(
      (a: IEmployment, b: IEmployment) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    )
    return employments.map(transformEmployment)
  } catch (err) {
    throw err
  }
}
export const getSingleEmployment = async (id: string) => {
  try {
    const employment = await employeeLoader.load(id.toString())
    if (!employment) throw new Error(`Employment record were not found`)
    return employment
  } catch (err) {
    throw err
  }
}

export const transformEmployment = ({
  _id,
  employee,
  department,
  start_date,
  end_date,
}: IEmployment) => {
  return {
    _id,
    employee: getSingleEmployee((employee as never) as string),
    department: getSingleDepartment((department as never) as string),
    start_date,
    end_date,
  }
}
