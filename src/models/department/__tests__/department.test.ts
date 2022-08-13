import * as db from '../../../utils/mongodb.mock'
import { Department } from '../../generated'
import { DepartmentModel } from '../index'
import { getDepartmentDataMock } from './department.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('departments model', () => {
  it('creates a department object', async () => {
    const department = new DepartmentModel(getDepartmentDataMock())
    expect(async () => await department.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['name', { name: '' }],
  ])(
    '%#) fails department validation',
    (fieldName: string, data: Partial<Department>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const department = new DepartmentModel(getDepartmentDataMock(data))
        await department.validate((err) => {
          expect(err).not.toBeNull()
        })
      })
    }
  )
})
