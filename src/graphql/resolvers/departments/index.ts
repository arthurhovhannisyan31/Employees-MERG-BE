// model
import { Department } from '../../../models'
import { ICreateDepartmentInput, IDepartment } from '../../../models/departmnet'
import { QueryContext } from '../../../models/common'
// helpers
import { transformDepartment } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const departments = async (
  _: never,
  { req }: QueryContext,
): Promise<IDepartment[]> => {
  authCheck(req)
  const result = await Department.find()
  return result.map(transformDepartment)
}

export const createDepartment = async (
  { input: { name } }: ICreateDepartmentInput,
  { req }: QueryContext,
): Promise<IDepartment> => {
  authCheck(req)
  const duplicate = await Department.findOne({ name })
  if (duplicate) {
    throw new Error(`Department ${name} already exists`)
  }
  const department = new Department({
    name,
  })
  const result = await department.save()
  return transformDepartment(result)
}
