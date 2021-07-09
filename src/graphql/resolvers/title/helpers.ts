// deps
import DataLoader from 'dataloader'
// model
import { TitleModel } from '../../../models'
import { Title } from '../../../models/title'

export const titleLoader = new DataLoader((ids) => getTitles(ids as string[]))

export const getTitles = async (ids: string[]): Promise<Title[]> => {
  const titles = await TitleModel.find({ _id: { $in: ids } })
  titles.sort(
    (a: Title, b: Title) =>
      ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
  )
  return titles.map(transformTitle)
}

export const getSingleTitle = async (id: string): Promise<Title> => {
  const title = await titleLoader.load(id.toString())
  if (!title) throw new Error(`Title ${id} not found`)
  return title
}

export const transformTitle = ({ _id, name }: Title): Title => ({
  _id,
  name,
})
