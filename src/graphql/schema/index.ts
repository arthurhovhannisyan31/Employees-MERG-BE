import { buildSchema, GraphQLSchema } from 'graphql'

import {
  type as authType,
  input as authInput,
  mutation as authMutation,
  query as authQuery,
} from './auth'
import {
  type as departmentType,
  input as departmentInput,
  mutation as departmentMutation,
  query as departmentQuery,
} from './department'
import {
  type as employeeType,
  input as employeeInput,
  mutation as employeeMutation,
  query as employeeQuery,
} from './employee'
import {
  type as employeeTitleType,
  input as employeeTitleInput,
  mutation as employeeTitleMutation,
  query as employeeTitleQuery,
} from './employeeTitle'
import {
  type as employmentType,
  input as employmentInput,
  mutation as employmentMutation,
  query as employmentQuery,
} from './employment'
import {
  type as genderType,
  input as genderInput,
  mutation as genderMutation,
  query as genderQuery,
} from './gender'
import {
  type as paycheckType,
  input as paycheckInput,
  mutation as paycheckMutation,
  query as paycheckQuery,
} from './paycheck'
import {
  type as titleType,
  input as titleInput,
  mutation as titleMutation,
  query as titleQuery,
} from './title'

export const schema: GraphQLSchema = buildSchema(`
  ${authInput}
  ${authType}
  ${departmentType}
  ${departmentInput}
  ${employmentType}
  ${employmentInput}
  ${employeeType}
  ${employeeInput}
  ${employeeTitleType}
  ${employeeTitleInput}
  ${genderType}
  ${genderInput}
  ${paycheckType}
  ${paycheckInput}
  ${titleType}
  ${titleInput}
  type RootQuery {
    ${departmentQuery}
    ${authQuery}
    ${genderQuery}
    ${titleQuery}
    ${employmentQuery}
    ${employeeQuery}
    ${employeeTitleQuery}
    ${paycheckQuery}
  }
  type RootMutation {
    ${departmentMutation}
    ${authMutation}
    ${genderMutation}
    ${titleMutation}
    ${employmentMutation}
    ${employeeMutation}
    ${employeeTitleMutation}
    ${paycheckMutation}
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
