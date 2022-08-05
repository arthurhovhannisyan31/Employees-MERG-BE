import { mockId, mockDate } from '../../../utils/testHelpers'
import { Employee } from '../../generated'

export const employeeDataStub: Employee = {
  _id: mockId,
  birth_date: mockDate,
  department: mockId,
  first_name: 'FirstName',
  gender: mockId,
  hire_date: mockDate,
  last_name: 'LastName',
  title: mockId,
}
