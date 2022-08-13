import { mockId, mockDate } from '../../../utils/testHelpers'
import { employeeDataStub } from '../../employee/__tests__/employee.stub'
import { EmployeeTitle } from '../../generated'
import { titleStub } from '../../title/__tests__/title.stub'

export const employeeTitleStub: EmployeeTitle = {
  _id: mockId,
  end_date: mockDate,
  start_date: mockDate,
  title: titleStub,
  employee: employeeDataStub,
}
