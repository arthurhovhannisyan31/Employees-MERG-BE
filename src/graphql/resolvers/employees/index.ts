// model
import {
  ICreateEmployeeInput,
  IUpdateEmployeeInput,
  IGetEmployeeInput,
  IGetEmployeesInput,
  IEmployee,
  IEmployees,
} from '../../../models/employee'
import { QueryContext } from '../../../models/common'
// helpers
import { Employee } from '../../../models'
import { transformEmployee } from './helpers'
import { authCheck } from '../../../utils/helpers'

export const employees = async (
  { input }: IGetEmployeesInput,
  { req }: QueryContext
): Promise<IEmployees> => {
  authCheck(req)
  const { limit = 100, offset = 0 } = input || {}
  const nodes = await Employee.find().limit(limit).skip(offset)
  return {
    nodes: nodes.map(transformEmployee),
    count: await Employee.countDocuments(),
  }
}
export const employee = async (
  { input: { id } }: IGetEmployeeInput,
  { req }: QueryContext
): Promise<IEmployee> => {
  authCheck(req)
  const result = await Employee.findOne({ _id: id })
  if (!result) {
    throw new Error(`Employee ${id} was not found`)
  }
  return transformEmployee(result)
}
export const createEmployee = async (
  { input }: ICreateEmployeeInput,
  { req }: QueryContext
): Promise<IEmployee> => {
  authCheck(req)
  const duplicate = await Employee.findOne({
    first_name: input.first_name,
    last_name: input.last_name,
  })
  if (duplicate) {
    throw new Error(
      `Employee name:${input.first_name}, ${input.last_name} already exists`
    )
  }
  const employee = new Employee(input)
  const result = await employee.save()
  return transformEmployee(result)
}

export const updateEmployee = async (
  { input: props }: IUpdateEmployeeInput,
  { req }: QueryContext
): Promise<IEmployee> => {
  authCheck(req)
  const { id, ...updateProps } = props
  const employee = await Employee.findOneAndUpdate({ _id: id }, updateProps, {
    new: true,
  })
  if (!employee) {
    throw new Error(`Employee by id: ${id} does not exists`)
  }
  return transformEmployee(employee)
}

export const deleteEmployee = async (): Promise<null> => {
  return null
}
