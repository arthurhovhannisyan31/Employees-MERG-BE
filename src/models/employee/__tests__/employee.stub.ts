import { Types } from 'mongoose'

import { Employee } from '../../generated'

const mockId = new Types.ObjectId().toString()

export const employeeDataStub: Employee = {
  _id: mockId,
  birth_date: '1959-12-03T21:00:00.000+00:00',
  department: mockId,
  first_name: 'FirstName',
  gender: mockId,
  hire_date: '1986-08-28T21:00:00.000+00:00',
  last_name: 'LastName',
  title: mockId,
}
