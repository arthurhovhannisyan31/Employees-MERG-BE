import * as db from '../../../utils/mongodb.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('description', () => {
  it('description', async () => {
    expect(1).toEqual(1)
  })
})
