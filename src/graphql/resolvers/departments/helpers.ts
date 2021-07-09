// deps
import DataLoader from 'dataloader'
// models
import { DepartmentModel } from '../../../models'
import { Department } from '../../../models/departmnet'

export const departmentLoader = new DataLoader((ids) =>
  getDepartments(ids as string[])
)

export const getDepartments = async (ids: string[]): Promise<Department[]> => {
  const departments = await DepartmentModel.find({ _id: { $in: ids } })
  departments.sort(
    (a: Department, b: Department) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return departments.map(transformDepartment)
}

export const getSingleDepartment = async (id: string): Promise<Department> => {
  const department = await departmentLoader.load(id.toString())
  if (!department) throw new Error(`Department not found`)
  return department
}

export const transformDepartment = ({ _id, name }: Department): Department => ({
  _id,
  name,
})
