// deps
import { Department } from '../../models'
// local
// helpers
import { transformDepartment } from './helpers'
import { IDepartmentInput } from '../../types'

export const departments = async () => {
  try {
    const result = await Department.find()
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
    const duplicate = await Department.findOne({ name })
    if (duplicate) {
      throw new Error(`Department ${name} already exists`)
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
