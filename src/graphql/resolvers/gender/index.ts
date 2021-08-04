// model
import { GenderModel } from '../../../models'
import { QueryContext } from '../../../models/common'
import { Gender, RootMutationCreateGenderArgs } from '../../../models/generated'
// helpers
import { transformGender } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const genders = async (
  _: never,
  { req }: QueryContext
): Promise<Gender[]> => {
  authCheck(req)
  const result = await GenderModel.find()
  return result.map(transformGender)
}

export const createGender = async (
  { input: { name } }: RootMutationCreateGenderArgs,
  { req }: QueryContext
): Promise<Gender> => {
  authCheck(req)
  const duplicate = await GenderModel.findOne({ name })
  if (duplicate) {
    throw new Error(`Gender ${name} already exists`)
  }
  const gender = new GenderModel({
    name,
  })
  const result = await gender.save()
  return transformGender(result)
}
