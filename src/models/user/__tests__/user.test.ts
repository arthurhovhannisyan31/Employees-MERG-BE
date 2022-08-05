import * as db from '../../../utils/mongodb.mock'
import { User } from '../../generated'
import { UserModel } from '../index'
import { getUserDataMock } from './user.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('user model', () => {
  it('creates a user object', () => {
    const user = new UserModel(getUserDataMock())
    expect(async () => await user.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['email', { email: '' }],
    ['name', { name: '' }],
    ['password', { password: '' }],
  ])(`%#) fails user validation`, (fieldName: string, data: Partial<User>) => {
    it(`fails validation for: ${fieldName}`, async () => {
      const user = new UserModel(getUserDataMock(data))
      await user.validate((err) => expect(err).not.toBeNull())
    })
  })
})
