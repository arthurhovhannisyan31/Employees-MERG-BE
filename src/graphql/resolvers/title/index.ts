// model
import { Title, TitleModel } from '../../../models/title'
import { TitleInput } from '../../../models/title'
import { QueryContext } from '../../../models/common'
// helpers
import { transformTitle } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const titles = async (
  _: never,
  { req }: QueryContext
): Promise<Title[]> => {
  authCheck(req)
  const result = await TitleModel.find()
  return result.map(transformTitle)
}

export const createTitle = async (
  { input: { name } }: TitleInput,
  { req }: QueryContext
): Promise<Title> => {
  authCheck(req)
  const duplicate = await TitleModel.findOne({ name })
  if (duplicate) {
    throw new Error(`Title ${name} already exists`)
  }
  const title = new TitleModel({
    name,
  })
  const result = await title.save()
  return transformTitle(result)
}
