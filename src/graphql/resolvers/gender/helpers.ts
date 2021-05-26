// deps
import DataLoader from 'dataloader'
// local
import { Gender } from '../../../models'
// helpers
import { IGender } from '../../../models/gender'

export const genderLoader = new DataLoader((ids) => getGenders(ids as string[]))

export const getGenders = async (ids: string[]): Promise<IGender[]> => {
  const genders = await Gender.find({ _id: { $in: ids } })
  genders.sort(
    (a: IGender, b: IGender) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return genders.map(transformGender)
}
export const getSingleGender = async (id: string): Promise<IGender> => {
  const gender = await genderLoader.load(id.toString())
  if (!gender) throw new Error(`Gender ${id} was not found`)
  return gender
}
export const transformGender = ({ _id, name }: IGender): IGender => ({
  _id,
  name,
})
