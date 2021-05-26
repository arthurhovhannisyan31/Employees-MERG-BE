// deps
import DataLoader from 'dataloader'
// model
import { Title } from '../../../models'
import { ITitle } from '../../../models/title'

export const titleLoader = new DataLoader((ids) => getTitles(ids as string[]))

export const getTitles = async (ids: string[]): Promise<ITitle[]> => {
  const titles = await Title.find({ _id: { $in: ids } })
  titles.sort(
    (a: ITitle, b: ITitle) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return titles.map(transformTitle)
}

export const getSingleTitle = async (id: string): Promise<ITitle> => {
  const title = await titleLoader.load(id.toString())
  if (!title) throw new Error(`Title ${id} not found`)
  return title
}

export const transformTitle = ({ _id, name }: ITitle): ITitle => ({
  _id,
  name,
})
