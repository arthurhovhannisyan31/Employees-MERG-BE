// deps
// models
import { DepartmentModel as Department } from '../../models/departmnet'
// helpers
import { transformDepartment } from './helpers'
import { IDepartmentInput } from '../../types'

export const departments = async () => {
  try {
    const result = await Department.find()
    console.log(result)
    return result.map(transformDepartment)
  } catch (err) {
    throw err
  }
}

export const createDepartment = async ({
  input: { name },
}: IDepartmentInput) => {
  // if (!req.isAuth) {
  //   throw new Error('Unauthenticated request')
  // }
  try {
    // todo add check if exists
    const existingDepartment = await Department.find({ name })
    console.log(existingDepartment)
    if (existingDepartment) {
      // throw new Error(`Department ${name} already exists`)
    }
    const department = new Department({
      name,
    })
    const result = await department.save()
    return transformDepartment(result)
  } catch (err) {
    throw err
  }
}
