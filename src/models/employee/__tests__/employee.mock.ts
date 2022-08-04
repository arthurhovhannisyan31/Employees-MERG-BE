import { Employee } from '../../generated'
import { employeeDataStub } from './employee.stub'

export const getEmployeeDataMock = (data?: Partial<Employee>): Employee => {
  return {
    ...employeeDataStub,
    ...data,
  }
}
