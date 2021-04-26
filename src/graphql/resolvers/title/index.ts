// model
import { ITitle, TitleModel as Title } from '../../../models/title'
import { ITitleInput } from '../../../models/title'
import { QueryContext } from '../../../models/common'
// helpers
import { transformTitle } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const titles = async (
  _: never,
  { req }: QueryContext,
): Promise<ITitle[]> => {
  authCheck(req)
  const result = await Title.find()
  return result.map(transformTitle)
}

export const createTitle = async (
  { input: { name } }: ITitleInput,
  { req }: QueryContext,
): Promise<ITitle> => {
  authCheck(req)
  const duplicate = await Title.findOne({ name })
  if (duplicate) {
    throw new Error(`Title ${name} already exists`)
  }
  const title = new Title({
    name,
  })
  const result = await title.save()
  return transformTitle(result)
}
