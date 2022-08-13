import * as db from '../../../utils/mongodb.mock'
import { ForgottenPassword } from '../../generated'
import { ForgottenPasswordModel } from '../index'
import { getForgetPasswordDataMock } from './forgetPassword.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('forgetPassport model', () => {
  it('creates a forgetPassport object', () => {
    const forgetPassport = new ForgottenPasswordModel(
      getForgetPasswordDataMock()
    )
    expect(async () => await forgetPassport.validate()).not.toThrow()
  })
  describe.each([
    ['key', { key: '' }],
    ['userId', { userId: '' }],
    ['expiration', { expiration: '' }],
  ])(
    '%#) fails forgetPasswordValidation',
    (fieldName: string, data: Partial<ForgottenPassword>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const forgetPassword = new ForgottenPasswordModel(
          getForgetPasswordDataMock(data)
        )
        await forgetPassword.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
