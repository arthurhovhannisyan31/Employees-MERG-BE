import { TitleModel } from '../../../models'
import { QueryContext } from '../../../models/common'
import { RootMutationCreateTitleArgs, Title } from '../../../models/generated'
import { authCheck } from '../../../utils/helpers'
import { transformTitle } from './helpers'

export const titles = async (
  _: never,
  { req }: QueryContext
): Promise<Title[]> => {
  authCheck(req)
  const result = await TitleModel.find()
  return result.map(transformTitle)
}

export const createTitle = async (
  { input: { name } }: RootMutationCreateTitleArgs,
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
