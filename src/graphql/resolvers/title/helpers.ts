// deps
import DataLoader from 'dataloader'
import { Title } from '../../../models'
import { ITitle } from '../../../models/title'
// local
// helpers

// @ts-ignore
export const titleLoader = new DataLoader((ids: string[]) => getTitles(ids))

export const getTitles = async (ids: string[]) => {
  try {
    const titles = await Title.find({ _id: { $in: ids } })
    titles.sort(
      (a: ITitle, b: ITitle) =>
        ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    )
    return titles.map(transformTitle)
  } catch (err) {
    throw err
  }
}

export const getSingleTitle = async (id: string) => {
  try {
    const title = await titleLoader.load(id.toString())
    if (!title) throw new Error(`Title ${id} not found`)
    return title
  } catch (err) {
    throw err
  }
}

export const transformTitle = ({ _id, name }: ITitle) => ({
  _id,
  name,
})
