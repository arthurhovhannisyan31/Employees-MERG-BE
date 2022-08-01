import { EmployeeModel } from '../employee'

describe('auth resolver', () => {
  it('should', () => {
    const employee = new EmployeeModel()
    employee.validate((err) => {
      console.log(err)
    })
    expect(1).toEqual(1)
  })
})
