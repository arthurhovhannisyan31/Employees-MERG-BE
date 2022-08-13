import * as db from '../../../utils/mongodb.mock'
import { Gender } from '../../generated'
import { GenderModel } from '../index'
import { getGenderDataMock } from './gender.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('gender model', () => {
  it('creates gender object', () => {
    const gender = new GenderModel(getGenderDataMock())
    expect(async () => gender.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['name', { name: '' }],
  ])(
    '%#) fails gender validation',
    (fieldName: string, data: Partial<Gender>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const gender = new GenderModel(getGenderDataMock(data))
        await gender.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
