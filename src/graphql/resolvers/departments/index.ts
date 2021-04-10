// model
import { Department } from '../../../models'
import { ICreateDepartmentInput } from '../../../models/departmnet'
import { QueryOptions } from '../../../models/common'
// helpers
import { transformDepartment } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const departments = async (_: never, { req }: QueryOptions) => {
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
  { req }: QueryOptions,
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
