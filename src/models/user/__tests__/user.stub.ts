import { mockId } from '../../../utils/testHelpers'
import { User } from '../../generated'

export const userDataStub: User = {
  _id: mockId,
  name: 'name',
  password: 'password',
  email: 'email',
}
