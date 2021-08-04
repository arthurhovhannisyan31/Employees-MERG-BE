// deps
import DataLoader from 'dataloader'
// local
import { GenderModel } from '../../../models'
// helpers
import { Gender } from '../../../models/generated'

export const genderLoader = new DataLoader((ids) => getGenders(ids as string[]))

export const getGenders = async (ids: string[]): Promise<Gender[]> => {
  const genders = await GenderModel.find({ _id: { $in: ids } })
  genders.sort(
    (a: Gender, b: Gender) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return genders.map(transformGender)
}
export const getSingleGender = async (id: string): Promise<Gender> => {
  const gender = await genderLoader.load(id.toString())
  if (!gender) throw new Error(`Gender ${id} was not found`)
  return gender
}
export const transformGender = ({ _id, name }: Gender): Gender => ({
  _id,
  name,
})
