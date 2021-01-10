// deps
import DataLoader from 'dataloader'
// local
import { Gender } from '../../../models'
// helpers
import { IGender } from '../../../models/gender'

export const genderLoader = new DataLoader((ids) => getGenders(ids as string[]))

export const getGenders = async (ids: string[]) => {
  try {
    const genders = await Gender.find({ _id: { $in: ids } })
    genders.sort(
      (a: IGender, b: IGender) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    )
    return genders.map(transformGender)
  } catch (err) {
    throw err
  }
}
export const getSingleGender = async (id: string) => {
  try {
    const gender = await genderLoader.load(id.toString())
    if (!gender) throw new Error(`Gender ${id} was not found`)
    return gender
  } catch (err) {
    throw err
  }
}
export const transformGender = ({ _id, name }: IGender) => ({
  _id,
  name,
})
