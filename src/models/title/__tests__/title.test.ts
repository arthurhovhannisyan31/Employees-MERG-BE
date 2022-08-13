import * as db from '../../../utils/mongodb.mock'
import { Title } from '../../generated'
import { TitleModel } from '../index'
import { getTitleDataMock } from './title.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('title model', () => {
  it('creates a title object', () => {
    const title = new TitleModel(getTitleDataMock())
    expect(async () => await title.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['name', { name: '' }],
  ])(
    '%#) fails title validation',
    (fieldName: string, data: Partial<Title>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const title = new TitleModel(getTitleDataMock(data))
        await title.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
