import * as db from '../../../utils/mongodb.mock'
import { getDepartmentDataMock } from '../../department/__tests__/department.mock'
import { getEmployeeDataMock } from '../../employee/__tests__/employee.mock'
import { Employment } from '../../generated'
import { EmploymentModel } from '../index'
import { getEmploymentDataMock } from './employement.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('employment model', () => {
  it('creates an employment object', () => {
    const employment = new EmploymentModel(getEmploymentDataMock())
    expect(async () => await employment.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['start_date', { start_date: '' }],
    ['end_date', { end_date: '' }],
    ['employee', { employee: getEmployeeDataMock({ _id: '' }) }],
    ['department', { department: getDepartmentDataMock({ _id: '' }) }],
  ])(
    '%#) fails employment validation',
    (fieldName: string, data: Partial<Employment>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const employment = new EmploymentModel(getEmploymentDataMock(data))
        await employment.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
