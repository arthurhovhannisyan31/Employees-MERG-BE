import { mockDate } from '../../../utils/testHelpers'
import { ForgottenPassword } from '../../generated'

export const forgetPasswordDataStub: ForgottenPassword = {
  key: 'key',
  userId: 'id',
  expiration: mockDate,
}
