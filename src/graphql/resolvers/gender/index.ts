// model
import { Gender } from '../../../models'
import { ICreateGenderInput } from '../../../models/gender'
import { QueryOptions } from '../../../models/common'
// helpers
import { transformGender } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const genders = async (_: never, { req }: QueryOptions) => {
  authCheck(req)
  try {
    const result = await Gender.find()
    return result.map(transformGender)
  } catch (err) {
    throw err
  }
}

export const createGender = async (
  { input: { name } }: ICreateGenderInput,
  { req }: QueryOptions,
) => {
  authCheck(req)
  try {
    const duplicate = await Gender.findOne({ name })
    if (duplicate) {
      throw new Error(`Gender ${name} already exists`)
    }
    const gender = new Gender({
      name,
    })
    const result = await gender.save()
    return transformGender(result)
  } catch (err) {
    throw err
  }
}
