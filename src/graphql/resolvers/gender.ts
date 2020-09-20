// deps
import { GenderModel as Gender } from '../../models/gender'
// local
// helpers
import { transformGender } from './helpers'
import { IGenderInput } from '../../types'

export const genders = async () => {
  try {
    const result = await Gender.find()
    return result.map(transformGender)
  } catch (err) {
    throw err
  }
}

export const createGender = async ({ input: { name } }: IGenderInput) => {
  // if (!req.isAuth) {
  //   throw new Error('Unauthenticated request')
  // }
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
