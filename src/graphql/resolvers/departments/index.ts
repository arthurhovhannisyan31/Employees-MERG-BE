// deps
// local
import { Department } from '../../../models'
// helpers
import { transformDepartment } from './helpers'
import { ICreateDepartmentInput } from '../../../models/departmnet'
import { IAuthRequest } from '../../../models/auth'
import { authCheck } from '../../utils/helpers'

export const departments = async (_: never, req: IAuthRequest) => {
  authCheck(req)
  try {
    const result = await Department.find()
    return result.map(transformDepartment)
  } catch (err) {
    throw err
  }
}

export const createDepartment = async (
  { input: { name } }: ICreateDepartmentInput,
  req: IAuthRequest,
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
