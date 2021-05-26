// deps
import DataLoader from 'dataloader'
// models
import { Department } from '../../../models'
import { IDepartment } from '../../../models/departmnet'

export const departmentLoader = new DataLoader((ids) =>
  getDepartments(ids as string[])
)

export const getDepartments = async (ids: string[]): Promise<IDepartment[]> => {
  const departments = await Department.find({ _id: { $in: ids } })
  departments.sort(
    (a: IDepartment, b: IDepartment) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return departments.map(transformDepartment)
}

export const getSingleDepartment = async (id: string): Promise<IDepartment> => {
  const department = await departmentLoader.load(id.toString())
  if (!department) throw new Error(`Department not found`)
  return department
}

export const transformDepartment = ({
  _id,
  name,
}: IDepartment): IDepartment => ({
  _id,
  name,
})
