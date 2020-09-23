// deps
import { Department } from '../../models'
// local
// helpers
import { transformDepartment } from './helpers'
import { IAuthRequest, IDepartmentInput } from '../../types'
import { authCheck } from '../utils/helpers'

export const departments = async () => {
  try {
    const result = await Department.find()
    return result.map(transformDepartment)
  } catch (err) {
    throw err
  }
}

export const createDepartment = async (
  { input: { name } }: IDepartmentInput,
  req: IAuthRequest
) => {
  authCheck(req)
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
