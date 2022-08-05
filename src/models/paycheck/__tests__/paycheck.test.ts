import * as db from '../../../utils/mongodb.mock'
import { Paycheck } from '../../generated'
import { PaycheckModel } from '../index'
import { getPaycheckDataMock } from './paycheck.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('paycheck model', () => {
  it('creates paycheck object', async () => {
    const paycheck = new PaycheckModel(getPaycheckDataMock())
    expect(async () => await paycheck.validate()).not.toBeNull()
  })
  describe.each([['_id', { _id: '' }]])(
    '%#) fails paycheck validation',
    (fieldName: string, data: Partial<Paycheck>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const paycheck = new PaycheckModel(getPaycheckDataMock(data))
        await paycheck.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
