// model
import {
  CreateEmployeeInput,
  UpdateEmployeeInput,
  GetEmployeeInput,
  GetEmployeesInput,
  Employee,
  Employees,
} from '../../../models/employee'
import { QueryContext } from '../../../models/common'
// helpers
import { EmployeeModel } from '../../../models'
import { transformEmployee } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const employees = async (
  { input }: GetEmployeesInput,
  { req }: QueryContext
): Promise<Employees> => {
  authCheck(req)
  const { limit = 100, offset = 0 } = input || {}
  const nodes = await EmployeeModel.find().limit(limit).skip(offset)
  return {
    nodes: nodes.map(transformEmployee),
    count: await EmployeeModel.countDocuments(),
  }
}
export const employee = async (
  { input: { id } }: GetEmployeeInput,
  { req }: QueryContext
): Promise<Employee> => {
  authCheck(req)
  const result = await EmployeeModel.findOne({ _id: id })
  if (!result) {
    throw new Error(`Employee ${id} was not found`)
  }
  return transformEmployee(result)
}
export const createEmployee = async (
  { input }: CreateEmployeeInput,
  { req }: QueryContext
): Promise<Employee> => {
  authCheck(req)
  const duplicate = await EmployeeModel.findOne({
    first_name: input.first_name,
    last_name: input.last_name,
  })
  if (duplicate) {
    throw new Error(
      `Employee name:${input.first_name}, ${input.last_name} already exists`
    )
  }
  const employee = new EmployeeModel(input)
  const result = await employee.save()
  return transformEmployee(result)
}

export const updateEmployee = async (
  { input: props }: UpdateEmployeeInput,
  { req }: QueryContext
): Promise<Employee> => {
  authCheck(req)
  const { id, ...updateProps } = props
  const employee = await EmployeeModel.findOneAndUpdate(
    { _id: id },
    updateProps,
    {
      new: true,
    }
  )
  if (!employee) {
    throw new Error(`Employee by id: ${id} does not exists`)
  }
  return transformEmployee(employee)
}

export const deleteEmployee = async (): Promise<null> => {
  return null
}
