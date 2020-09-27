// deps
// local
import { transformPaycheck } from './paycheck'
import { transformEmployeeTitle } from './employeeTitle'
import { transformEvent, getSingleEvent, eventLoader } from './events'
import {
  transformEmployee,
  getSingleEmployee,
  employeeLoader,
} from './employee'
import { transformEmployment } from './employment'
import { transformTitle, getSingleTitle } from './title'
import { transformGender, getSingleGender } from './gender'
import { getSingleUser } from './auth'
import { transformBooking } from './bookings'
import { transformDepartment, getSingleDepartment } from './department'
// helpers

export {
  // transforms
  transformPaycheck,
  transformEmployeeTitle,
  transformEvent,
  transformEmployment,
  transformTitle,
  transformEmployee,
  transformGender,
  transformBooking,
  transformDepartment,
  // single
  getSingleEmployee,
  getSingleTitle,
  getSingleGender,
  getSingleUser,
  getSingleDepartment,
  getSingleEvent,
  // loaders
  employeeLoader,
  eventLoader,
}
