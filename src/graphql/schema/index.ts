// deps
import { buildSchema } from 'graphql'
// local
// helpers

export const schema = buildSchema(`
  # entities event-booking -----------------------------------------------------
  type Event {
    _id: ID!
    title: String!
    description: String!
    price: Float!
    date: String!
    creator: User!
  }
  type User {
    _id: ID!
    email: String!
    password: String
    createdEvents: [Event!]
  }
  type Booking {
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  # entities employees ---------------------------------------------------------
  type Department {
    _id: ID!
    name: String!
  }
  type Title {
    _id: ID!
    name: String!
  }
  type Gender {
    _id: ID!
    name: String!
  }
  type Employee {
    _id: ID!
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: Gender!
  }
  type Employment {
    _id: ID!
    employee: Employee!
    department: Department!
    start_date: String!
    end_date: String!
  }
  type EmployeeTitle {
    _id: ID!
    employee: Employee!
    title: Title!
    start_date: String!
    end_date: String!
  }
  type Paycheck {
    _id: ID!
    employee: Employee!
    salary: Float!
    start_date: String!
    end_date: String!
  }
  
  # inputs event-booking -------------------------------------------------------
  input EventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
  }
  input UserInput {
    email: String!
    password: String!
  }
  # inputs employees -----------------------------------------------------------
  input CreateDepartmentInput {
    name: String!
  }
  input CreateTitleInput {
    name: String!
  }
  input createGenderInput {
    name: String!
  }
  input CreateEmployeeInput {
    birth_date: String!
    first_name: String!
    last_name: String!
    hire_date: String!
    gender: ID!
  }
  input GetEmployeeInput {
    id: ID!
  }
  input CreateEmploymentInput {
    employee: ID!
    department: ID!
    start_date: String!
    end_date: String!
  }
  input CreateEmployeeTitleInput {
    employee: ID!
    title: ID!
    start_date: String!
    end_date: String!
  }
  input CreatePaycheckInput {
    employee: ID!
    salary: Float!
    start_date: String!
    end_date: String!
  }
  # root -----------------------------------------------------------------------
  type RootQuery {
    # event-booking-root
    events: [Event!]!
    bookings: [Booking!]!
    login(email: String!, password: String!):AuthData!
    # employees-root
    departments: [Department!]!
    titles: [Title!]!
    genders: [Gender!]!
    employees: [Employee!]!
    employee(input: GetEmployeeInput!): Employee!
    employments: [Employment!]!
    employeesTitles: [EmployeeTitle!]!
    paycheckHistory: [Paycheck!]!
  }
  type RootMutation {
    # event-booking-root
    createEvent(eventInput: EventInput!): Event
    createUser(userInput: UserInput!): User
    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
    # employees-root
    createDepartment(input: CreateDepartmentInput!):Department!
    createTitle(input: CreateTitleInput!): Title!
    createGender(input: createGenderInput!): Gender!
    createEmployee(input: CreateEmployeeInput!): Employee!
    createEmployment(input: CreateEmploymentInput!): Employment!
    createEmployeeTitle(input: CreateEmployeeTitleInput!): EmployeeTitle!
    createPaycheck(input: CreatePaycheckInput!): Paycheck!  
  }
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)
