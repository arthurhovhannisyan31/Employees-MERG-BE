// model
import { Gender } from '../../../models'
import { ICreateGenderInput, IGender } from '../../../models/gender'
import { QueryOptions } from '../../../models/common'
// helpers
import { transformGender } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const genders = async (
  _: never,
  { req }: QueryOptions,
): Promise<IGender[]> => {
  authCheck(req)
  const result = await Gender.find()
  return result.map(transformGender)
}

export const createGender = async (
  { input: { name } }: ICreateGenderInput,
  { req }: QueryOptions,
): Promise<IGender> => {
  authCheck(req)
  const duplicate = await Gender.findOne({ name })
  if (duplicate) {
    throw new Error(`Gender ${name} already exists`)
  }
  const gender = new Gender({
    name,
  })
  const result = await gender.save()
  return transformGender(result)
}
