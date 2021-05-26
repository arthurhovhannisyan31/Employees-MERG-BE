// deps
import DataLoader from 'dataloader'
// model
import { Employment } from '../../../models'
import { IEmployment, IEmploymentResponse } from '../../../models/employment'
import { IEmployee } from '../../../models/employee'
// helpers
import { getSingleEmployee } from '../employees/helpers'
import { getSingleDepartment } from '../departments/helpers'

export const employmentLoader = new DataLoader((ids) =>
  getEmployments(ids as string[])
)

export const getEmployments = async (
  ids: string[]
): Promise<Promise<IEmploymentResponse>[]> => {
  const employments = await Employment.find({ _id: { $in: ids } })
  employments.sort(
    (a: IEmployment, b: IEmployment) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return employments.map(transformEmployment)
}

export const getEmploymentsByEmployee = async (
  id: string
): Promise<Promise<IEmploymentResponse>[]> => {
  const employments = await Employment.find({
    employee: id as never as IEmployee,
  })
  return employments.map(transformEmployment)
}

export const getSingleEmployment = async (
  id: string
): Promise<IEmploymentResponse> => {
  const employment = await employmentLoader.load(id.toString())
  if (!employment) throw new Error(`Employment record were not found`)
  return employment
}

export const transformEmployment = async ({
  _id,
  employee,
  department,
  start_date,
  end_date,
}: IEmployment): Promise<IEmploymentResponse> => ({
  _id,
  employee: await getSingleEmployee(employee as never as string),
  department: await getSingleDepartment(department as never as string),
  start_date,
  end_date,
})
