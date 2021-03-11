// deps
// local
import { TitleModel as Title } from '../../../models/title'
// helpers
import { transformTitle } from './helpers'
import { IAuthRequest } from '../../../models/auth'
import { ITitleInput } from '../../../models/title'
import { authCheck } from '../../../utils/helpers'

export const titles = async (_: never, req: IAuthRequest) => {
  authCheck(req)
  try {
    const result = await Title.find()
    return result.map(transformTitle)
  } catch (err) {
    throw err
  }
}

export const createTitle = async (
  { input: { name } }: ITitleInput,
  req: IAuthRequest,
) => {
  if (!req.isAuth) {
    throw new Error('Unauthenticated request')
  }
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
