import * as db from '../../../utils/mongodb.mock'
import { Employee } from '../../generated'
import { EmployeeModel } from '../index'
import { getEmployeeDataMock } from './employee.mock'

beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('employee model', () => {
  it('creates an employee object', () => {
    const employee = new EmployeeModel(getEmployeeDataMock())
    expect(async () => await employee.validate()).not.toThrow()
  })
  describe.each([
    ['_id', { _id: '' }],
    ['birth_date', { birth_date: '' }],
    ['first_name', { first_name: '' }],
    ['last_name', { last_name: '' }],
    ['hire_date', { hire_date: '' }],
  ])(
    '%#) fails employee validation',
    (fieldName: string, data: Partial<Employee>) => {
      it(`fails validation for: ${fieldName}`, async () => {
        const employee = new EmployeeModel(getEmployeeDataMock(data))
        await employee.validate((err) => expect(err).not.toBeNull())
      })
    }
  )
})
