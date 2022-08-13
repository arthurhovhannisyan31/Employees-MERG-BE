import * as db from '../../../utils/mongodb.mock'
import { getEmployeeDataMock } from '../../employee/__tests__/employee.mock'
import { EmployeeTitle } from '../../generated'
import { getTitleDataMock } from '../../title/__tests__/title.mock'
import { EmployeeTitleModel } from '../index'
import { getEmployeeTitleDataMock } from './employeeTitle.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('employeeTitle model', () => {
  it('creates an employeeTitle object', () => {
    const employeeTitle = new EmployeeTitleModel(getEmployeeTitleDataMock())
    expect(async () => await employeeTitle.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['end_date', { end_date: '' }],
    ['start_date', { start_date: '' }],
    ['title', { title: getTitleDataMock({ _id: '' }) }],
    ['employee', { employee: getEmployeeDataMock({ _id: '' }) }],
  ])(
    '%#) fails employeeTitle validation',
    (fieldName: string, data: Partial<EmployeeTitle>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const employeeTitle = new EmployeeTitleModel(
          getEmployeeTitleDataMock(data)
        )
        await employeeTitle.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
