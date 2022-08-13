import { mockId, mockDate } from '../../../utils/testHelpers'
import { departmentStub } from '../../department/__tests__/department.stub'
import { employeeDataStub } from '../../employee/__tests__/employee.stub'
import { Employment } from '../../generated'

export const employmentDataStub: Employment = {
  _id: mockId,
  end_date: mockDate,
  start_date: mockDate,
  employee: employeeDataStub,
  department: departmentStub,
}
