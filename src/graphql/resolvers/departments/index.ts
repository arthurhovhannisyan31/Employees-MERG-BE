import { DepartmentModel } from '../../../models'
import { QueryContext } from '../../../models/common'
import {
  RootMutationCreateDepartmentArgs,
  Department,
} from '../../../models/generated'
import { authCheck } from '../../../utils/helpers'
import { transformDepartment } from './helpers'

export const departments = async (
  _: never,
  { req }: QueryContext
): Promise<Department[]> => {
  authCheck(req)
  const result = await DepartmentModel.find()
  return result.map(transformDepartment)
}

export const createDepartment = async (
  { input: { name } }: RootMutationCreateDepartmentArgs,
  { req }: QueryContext
): Promise<Department> => {
  authCheck(req)
  const duplicate = await DepartmentModel.findOne({ name })
  if (duplicate) {
    throw new Error(`Department ${name} already exists`)
  }
  const department = new DepartmentModel({
    name,
  })
  const result = await department.save()
  return transformDepartment(result)
}
