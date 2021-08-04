// deps
import DataLoader from 'dataloader'
// model
import { EmploymentModel } from '../../../models'
import { EmploymentResponse } from '../../../models/employment'
import { Employment } from '../../../models/generated'
import { Employee } from '../../../models/generated'
// helpers
import { getSingleEmployee } from '../employees/helpers'
import { getSingleDepartment } from '../departments/helpers'

export const employmentLoader = new DataLoader((ids) =>
  getEmployments(ids as string[])
)

export const getEmployments = async (
  ids: string[]
): Promise<Promise<EmploymentResponse>[]> => {
  const employments = await EmploymentModel.find({ _id: { $in: ids } })
  employments.sort(
    (a: Employment, b: Employment) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return employments.map(transformEmployment)
}

export const getEmploymentsByEmployee = async (
  id: string
): Promise<Promise<EmploymentResponse>[]> => {
  const employments = await EmploymentModel.find({
    employee: id as never as Employee,
  })
  return employments.map(transformEmployment)
}

export const getSingleEmployment = async (
  id: string
): Promise<EmploymentResponse> => {
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
}: Employment): Promise<EmploymentResponse> => ({
  _id,
  employee: await getSingleEmployee(employee as never as string),
  department: await getSingleDepartment(department as never as string),
  start_date,
  end_date,
})
