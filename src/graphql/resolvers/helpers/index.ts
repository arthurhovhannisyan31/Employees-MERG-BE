// deps
import DataLoader from 'dataloader'
// local
import {
  Event,
  User,
  Employee,
  Gender,
  Employment,
  Department,
  EmployeeTitle,
  Title,
  Paycheck,
} from '../../../models'
// helpers
import { dateToISOString } from '../../utils/helpers'
import {
  IEvent,
  IBooking,
  IDepartment,
  ITitle,
  IGender,
  IEmployee,
  IEmployment,
  IEmployeeTitle,
  IPaycheck,
} from '../../../types'

// todo split apart
// todo remove unused parts

// @ts-ignore
const eventLoader = new DataLoader((eventIds: string[]) => getEvents(eventIds))
// @ts-ignore
const userLoader = new DataLoader((userIds: string[]) => getUsers(userIds))
// @ts-ignore
const employeeLoader = new DataLoader((ids: string[]) => getEmployees(ids))
// @ts-ignore
const genderLoader = new DataLoader((ids: string[]) => getGenders(ids))
// @ts-ignore
const employmentLoader = new DataLoader((ids: string[]) => getEmployments(ids))
// @ts-ignore
const departmentLoader = new DataLoader((ids: string[]) => getDepartments(ids))
// @ts-ignore
const titleLoader = new DataLoader((ids: string[]) => getTitles(ids))
// @ts-ignore
const employeeTitleLoader = new DataLoader((ids: string) =>
  getEmployeeTitles(ids)
)
// @ts-ignore
const paycheckLoader = new DataLoader((ids: string[]) =>
  getPaycheckHistory(ids)
)
// Event -----------------------------------------------------------------------
const getEvents = async (eventIds: string[]): Promise<IEvent[]> => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } })
    // @ts-ignore
    // events.sort((a: IEvent, b: IEvent) => {
    //   return (
    //     eventIds.indexOf(a._id.toString()) - eventIds.indexOf(b._id.toString())
    //   )
    // })
    // @ts-ignore
    return events.map(transformEvent)
  } catch (err) {
    throw err
  }
}
const getSingleEvent = async (eventId: string): Promise<IEvent> => {
  try {
    const event = await eventLoader.load(eventId.toString())
    if (!event) {
      throw new Error(`Event ${eventId} not found`)
    }
    // @ts-ignore
    return event
  } catch (err) {
    throw err
  }
}
export const transformEvent = (event: IEvent): IEvent => {
  return {
    ...event,
    _id: event._id,
    title: event.title,
    description: event.description,
    price: event.price,
    date: dateToISOString(event.date),
    // @ts-ignore
    creator: getSingleUser(event.creator),
  }
}

// User ------------------------------------------------------------------------
const getUsers = async (userIds: string[]) => {
  try {
    // @ts-ignore
    return await User.find({ _id: { $in: userIds } })
  } catch (err) {
    throw err
  }
}
const getSingleUser = async (userId: string) => {
  try {
    const user = await userLoader.load(userId.toString())
    if (!user) throw new Error('User not found')
    return {
      ...user,
      // @ts-ignore
      _id: user?._id,
      // @ts-ignore
      email: user?.email,
      // @ts-ignore
      password: '',
      // @ts-ignore
      createdEvents: () => eventLoader.loadMany(user.createdEvents),
    }
  } catch (err) {
    throw err
  }
}

// todo add sorting like in events
// todo add transforming like in events

// Gender ----------------------------------------------------------------------
const getGenders = async (ids: string[]) => {
  try {
    const genders = await Gender.find({ _id: { $in: ids } })
    // genders.sort(
    //   (a: IGender, b: IGender) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return genders.map(transformGender)
  } catch (err) {
    throw err
  }
}
const getSingleGender = async (id: string) => {
  try {
    const gender = await genderLoader.load(id.toString())
    if (!gender) throw new Error(`Gender ${id} was not found`)
    return gender
  } catch (err) {
    throw err
  }
}
export const transformGender = ({ _id, name }: IGender) => ({
  _id,
  name,
})

// Employee --------------------------------------------------------------------
const getEmployees = async (ids: string[]) => {
  try {
    const employees = await Employee.find({ _id: { $in: ids } })
    // employees.sort(
    //   (a: IEmployee, b: IEmployee) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return employees.map(transformEmployee)
  } catch (err) {
    throw err
  }
}
const getSingleEmployee = async (id: string) => {
  try {
    const employee = await employeeLoader.load(id.toString())
    if (!employee) throw new Error('Employee not found')
    return employee
  } catch (err) {
    throw err
  }
}
export const transformEmployee = ({
  _id,
  last_name,
  gender,
  first_name,
  birth_date,
  hire_date,
}: IEmployee) => {
  return {
    _id,
    birth_date,
    first_name,
    last_name,
    gender: getSingleGender((gender as never) as string),
    hire_date,
  }
}

// function handleSort<T>(arr: T[]):T[]{// @ts-ignore
//   return arr.sort((a, b) => arr.indexOf(a._id.toString()) - arr.indexOf(b._id.toString()))}
// Employment ------------------------------------------------------------------
const getEmployments = async (ids: string[]) => {
  try {
    const employments = await Employment.find({ _id: { $in: ids } })
    // employments.sort(
    //   (a: IEmployment, b: IEmployment) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return employments.map(transformEmployment)
  } catch (err) {
    throw err
  }
}
// const getSingleEmployment = async (id:string) => {
//   try {
//     const employment = await employeeLoader.load(id.toString())
//     if (!employment) throw new Error(`Employment record were not found`)
//     return employment
//   } catch (err){
//    throw err
//   }
// }

export const transformEmployment = ({
  _id,
  employee,
  department,
  start_date,
  end_date,
}: IEmployment) => {
  return {
    _id,
    employee: getSingleEmployee((employee as never) as string),
    department: getSingleDepartment((department as never) as string),
    start_date,
    end_date,
  }
}

// Department ------------------------------------------------------------------
const getDepartments = async (ids: string[]) => {
  try {
    const departments = await Department.find({ _id: { $in: ids } })
    // departments.sort(
    //   (a: IDepartment, b: IDepartment) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return departments.map(transformDepartment)
  } catch (err) {
    throw err
  }
}

const getSingleDepartment = async (id: string) => {
  try {
    const department = await departmentLoader.load(id.toString())
    if (!department) throw new Error(`Department not found`)
    return department
  } catch (err) {
    throw err
  }
}

export const transformDepartment = ({ _id, name }: IDepartment) => ({
  _id,
  name,
})

// Title -----------------------------------------------------------------------
const getTitles = async (ids: string[]) => {
  try {
    const titles = await Title.find({ _id: { $in: ids } })
    // titles.sort(
    //   (a: ITitle, b: ITitle) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return titles.map(transformTitle)
  } catch (err) {
    throw err
  }
}

const getSingleTitle = async (id: string) => {
  try {
    const title = await titleLoader.load(id.toString())
    if (!title) throw new Error(`Title ${id} not found`)
    return title
  } catch (err) {
    throw err
  }
}

export const transformTitle = ({ _id, name }: ITitle) => ({
  _id,
  name,
})

// EmployeeTitle----------------------------------------------------------------
const getEmployeeTitles = async (ids: string) => {
  try {
    const employeesTitles = await EmployeeTitle.find({ _id: { $in: ids } })
    // employeesTitles.sort(
    //   (a: IEmployeeTitle, b: IEmployeeTitle) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return employeesTitles.map(transformEmployeeTitle)
  } catch (err) {
    throw err
  }
}

// const getSingleEmployeeTitle = async (id: string) => {
//   try {
//     const employeeTitle = await employeeTitleLoader.load(id.toString())
//     if (!employeeTitle)
//       throw new Error(`Employee ${id} title record does not exist `)
//     return employeeTitle
//   } catch (err) {
//     throw err
//   }
// }

export const transformEmployeeTitle = ({
  _id,
  employee,
  title,
  start_date,
  end_date,
}: IEmployeeTitle) => ({
  _id,
  employee: getSingleEmployee((employee as never) as string),
  title: getSingleTitle((title as never) as string),
  start_date,
  end_date,
})

// PaycheckHistory -------------------------------------------------------------

const getPaycheckHistory = async (ids: string[]) => {
  try {
    const paycheckHistory = await Paycheck.find({ _id: { $in: ids } })
    // paycheckHistory.sort(
    //   (a: IPaycheck, b: IPaycheck) =>
    //     ids.indexOf(a._id.toString()) - ids.indexOf(b._id.toString())
    // )
    return paycheckHistory.map(transformPaycheck)
  } catch (err) {
    throw err
  }
}

// const getSinglePaycheck = async (id: string) => {
//   try {
//     const paycheck = await paycheckLoader.load(id.toString())
//     if (!paycheck) {
//       throw new Error('Paycheck not found')
//     }
//     return paycheck
//   } catch (err) {
//     throw err
//   }
// }

export const transformPaycheck = ({
  _id,
  employee,
  salary,
  start_date,
  end_date,
}: IPaycheck) => ({
  _id,
  employee: getSingleEmployee((employee as never) as string),
  salary,
  start_date,
  end_date,
})

// Booking----------------------------------------------------------------------
export const transformBooking = (booking: IBooking) => ({
  ...booking,
  _id: booking.id,
  user: getSingleUser(booking.user),
  event: getSingleEvent(booking.event),
  createdAt: dateToISOString(booking.createdAt),
  updatedAt: dateToISOString(booking.updatedAt),
})
