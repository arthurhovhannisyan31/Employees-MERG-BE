export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthData = {
  __typename?: 'AuthData';
  userCredentials: UserCredentials;
};

export type CreateDepartmentInput = {
  name: Scalars['String'];
};

export type CreateEmployeeInput = {
  birth_date: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  hire_date: Scalars['String'];
  gender: Scalars['ID'];
  department: Scalars['ID'];
  title: Scalars['ID'];
};

export type CreateEmployeeTitleInput = {
  employee: Scalars['ID'];
  title: Scalars['ID'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type CreateEmploymentInput = {
  employee: Scalars['ID'];
  department: Scalars['ID'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type CreatePaycheckInput = {
  employee: Scalars['ID'];
  salary: Scalars['Float'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type CreateTitleInput = {
  name: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<User>;
};

export type Department = {
  __typename?: 'Department';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type Employee = {
  __typename?: 'Employee';
  _id: Scalars['ID'];
  birth_date: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  hire_date: Scalars['String'];
  gender: Scalars['ID'];
  department: Scalars['ID'];
  title: Scalars['ID'];
};

export type EmployeeExtended = {
  __typename?: 'EmployeeExtended';
  _id: Scalars['ID'];
  birth_date: Scalars['String'];
  first_name: Scalars['String'];
  last_name: Scalars['String'];
  hire_date: Scalars['String'];
  gender: Scalars['ID'];
  department: Scalars['ID'];
  title: Scalars['ID'];
  paychecks: Array<Maybe<Paycheck>>;
  titles: Array<Maybe<EmployeeTitle>>;
  employments: Array<Maybe<Employment>>;
};

export type EmployeeTitle = {
  __typename?: 'EmployeeTitle';
  _id: Scalars['ID'];
  employee: Employee;
  title: Title;
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type Employees = {
  __typename?: 'Employees';
  nodes: Array<Employee>;
  count: Scalars['Int'];
};

export type Employment = {
  __typename?: 'Employment';
  _id: Scalars['ID'];
  employee: Employee;
  department: Department;
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgotPassword = {
  __typename?: 'ForgotPassword';
  key: Scalars['String'];
  userId: Scalars['String'];
  expiration: Scalars['String'];
};

export type ForgotPasswordInput = {
  email: Scalars['String'];
};

export type Gender = {
  __typename?: 'Gender';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type GetEmployeeInput = {
  id: Scalars['ID'];
};

export type GetEmployeesInput = {
  limit: Scalars['Int'];
  offset: Scalars['Int'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<AuthData>;
};

export type MeResponse = {
  __typename?: 'MeResponse';
  errors?: Maybe<Array<FieldError>>;
  data?: Maybe<UserCredentials>;
};

export type Paycheck = {
  __typename?: 'Paycheck';
  _id: Scalars['ID'];
  employee: Employee;
  salary: Scalars['Float'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createDepartment: Department;
  createUser: CreateUserResponse;
  createGender: Gender;
  createTitle: Title;
  createEmployment: Employment;
  createEmployee: Employee;
  updateEmployee: Employee;
  createEmployeeTitle: EmployeeTitle;
  createPaycheck: Paycheck;
};


export type RootMutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type RootMutationCreateUserArgs = {
  input: UserInput;
};


export type RootMutationCreateGenderArgs = {
  input: CreateGenderInput;
};


export type RootMutationCreateTitleArgs = {
  input: CreateTitleInput;
};


export type RootMutationCreateEmploymentArgs = {
  input: CreateEmploymentInput;
};


export type RootMutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type RootMutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};


export type RootMutationCreateEmployeeTitleArgs = {
  input: CreateEmployeeTitleInput;
};


export type RootMutationCreatePaycheckArgs = {
  input: CreatePaycheckInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  departments: Array<Department>;
  login: LoginResponse;
  logout?: Maybe<Scalars['Boolean']>;
  me: MeResponse;
  forgotPassword?: Maybe<LoginResponse>;
  genders: Array<Gender>;
  titles: Array<Title>;
  employments: Array<Employment>;
  employees: Employees;
  employee: Employee;
  employeesTitles: Array<EmployeeTitle>;
  paychecks: Array<Paycheck>;
};


export type RootQueryLoginArgs = {
  input: LoginInput;
};


export type RootQueryForgotPasswordArgs = {
  input: ForgotPasswordInput;
};


export type RootQueryEmployeesArgs = {
  input?: Maybe<GetEmployeesInput>;
};


export type RootQueryEmployeeArgs = {
  input: GetEmployeeInput;
};

export type Title = {
  __typename?: 'Title';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateEmployeeInput = {
  id?: Maybe<Scalars['ID']>;
  birth_date?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  hire_date?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['ID']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type UserCredentials = {
  __typename?: 'UserCredentials';
  _id: Scalars['String'];
  email: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateGenderInput = {
  name: Scalars['String'];
};
