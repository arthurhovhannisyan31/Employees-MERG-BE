import { AuthRequest } from '../../../../models/auth'
import { FieldError, QueryContext } from '../../../../models/common'
import { CreateUserInput, User } from '../../../../models/generated'
import * as db from '../../../../utils/mongodb.mock'
import { createUser } from '../index'

let requestMock: Partial<AuthRequest>

beforeEach(() => {
  requestMock = {
    session: {},
  } as AuthRequest
})
beforeAll(async () => await db.setup())
afterEach(async () => await db.dropCollection())
afterAll(async () => await db.dropDatabase())

describe('auth resolver', () => {
  it('creates a User', async () => {
    const payload: CreateUserInput = {
      email: 'email@email.email',
      name: 'name',
      password: 'Password1!',
    }
    const { data } = await createUser({ input: payload }, {
      req: requestMock,
    } as QueryContext)
    const result = data as User

    expect(result._id).not.toBeNull()
    expect(result.password).toEqual('')
    expect(result.name).toEqual(payload.name)
    expect(result.email).toEqual(payload.email)
  })
  describe('fails to create a user', () => {
    it('fail reason: email', async () => {
      const payload: CreateUserInput = {
        email: 'email@email',
        name: 'name',
        password: 'Password1!',
      }
      const { data, errors } = await createUser({ input: payload }, {
        req: requestMock,
      } as QueryContext)
      const dataResult = data as User
      const errorsResult = errors as FieldError[]

      expect(dataResult).toBeUndefined()
      expect(errorsResult).toHaveLength(1)
    })
    it('fail reason: password', async () => {
      const payload: CreateUserInput = {
        email: 'email@email.email',
        name: 'name',
        password: '',
      }
      const { data, errors } = await createUser({ input: payload }, {
        req: requestMock,
      } as QueryContext)
      const dataResult = data as User
      const errorsResult = errors as FieldError[]

      expect(dataResult).toBeUndefined()
      expect(errorsResult).toHaveLength(1)
    })
  })
})
