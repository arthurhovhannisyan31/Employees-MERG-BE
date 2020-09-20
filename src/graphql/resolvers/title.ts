// deps
import { TitleModel as Title } from '../../models/title'
// local
// helpers
import { transformTitle } from './helpers'
import { ITitleInput } from '../../types'

export const titles = async () => {
  try {
    const result = await Title.find()
    return result.map(transformTitle)
  } catch (err) {
    throw err
  }
}

export const createTitle = async ({ input: { name } }: ITitleInput) => {
  // if (!req.isAuth) {
  //   throw new Error('Unauthenticated request')
  // }
  try {
    const duplicate = await Title.findOne({ name })
    if (duplicate) {
      throw new Error(`Title ${name} already exists`)
    }
    const title = new Title({
      name,
    })
    const result = await title.save()
    return transformTitle(result)
  } catch (err) {
    throw err
  }
}
