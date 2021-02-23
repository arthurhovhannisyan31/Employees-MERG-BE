// deps
import DataLoader from 'dataloader'
// local
import { Department } from '../../../models'
// helpers
import { IDepartment } from '../../../models/departmnet'

export const departmentLoader = new DataLoader((ids) =>
  getDepartments(ids as string[]),
)

export const getDepartments = async (ids: string[]) => {
  try {
    const departments = await Department.find({ _id: { $in: ids } })
    departments.sort(
      (a: IDepartment, b: IDepartment) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString()),
    )
    return departments.map(transformDepartment)
  } catch (err) {
    throw err
  }
}

export const getSingleDepartment = async (id: string) => {
  try {
    const department = await departmentLoader.load(id.toString())
    if (!department) throw new Error(`Department not found`)
    return department
  } catch (err) {
    throw err
  }
}

export const transformDepartment = ({ _id, name }: IDepartment) => ({
  _id,
  name,
})
