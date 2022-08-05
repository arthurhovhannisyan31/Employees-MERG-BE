import { mockId, mockDate } from '../../../utils/testHelpers'
import { employeeDataStub } from '../../employee/__tests__/employee.stub'
import { Paycheck } from '../../generated'

export const paycheckDataStub: Paycheck = {
  _id: mockId,
  salary: 0,
  end_date: mockDate,
  start_date: mockDate,
  employee: employeeDataStub,
}
