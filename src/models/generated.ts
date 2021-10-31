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

export type AuthResponse = {
  __typename?: 'AuthResponse';
  data?: Maybe<AuthData>;
  errors?: Maybe<Array<FieldError>>;
};

export type CreateDepartmentInput = {
  name: Scalars['String'];
};

export type CreateEmployeeInput = {
  birth_date: Scalars['String'];
  department: Scalars['ID'];
  first_name: Scalars['String'];
  gender: Scalars['ID'];
  hire_date: Scalars['String'];
  last_name: Scalars['String'];
  title: Scalars['ID'];
};

export type CreateEmployeeTitleInput = {
  employee: Scalars['ID'];
  end_date: Scalars['String'];
  start_date: Scalars['String'];
  title: Scalars['ID'];
};

export type CreateEmploymentInput = {
  department: Scalars['ID'];
  employee: Scalars['ID'];
  end_date: Scalars['String'];
  start_date: Scalars['String'];
};

export type CreatePaycheckInput = {
  employee: Scalars['ID'];
  end_date: Scalars['String'];
  salary: Scalars['Float'];
  start_date: Scalars['String'];
};

export type CreateTitleInput = {
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateUserResponse = {
  __typename?: 'CreateUserResponse';
  data?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
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
  department: Scalars['ID'];
  first_name: Scalars['String'];
  gender: Scalars['ID'];
  hire_date: Scalars['String'];
  last_name: Scalars['String'];
  title: Scalars['ID'];
};

export type EmployeeExtended = {
  __typename?: 'EmployeeExtended';
  _id: Scalars['ID'];
  birth_date: Scalars['String'];
  department: Scalars['ID'];
  employments: Array<Maybe<Employment>>;
  first_name: Scalars['String'];
  gender: Scalars['ID'];
  hire_date: Scalars['String'];
  last_name: Scalars['String'];
  paychecks: Array<Maybe<Paycheck>>;
  title: Scalars['ID'];
  titles: Array<Maybe<EmployeeTitle>>;
};

export type EmployeeTitle = {
  __typename?: 'EmployeeTitle';
  _id: Scalars['ID'];
  employee: Employee;
  end_date: Scalars['String'];
  start_date: Scalars['String'];
  title: Title;
};

export type Employees = {
  __typename?: 'Employees';
  count: Scalars['Int'];
  nodes: Array<Employee>;
};

export type Employment = {
  __typename?: 'Employment';
  _id: Scalars['ID'];
  department: Department;
  employee: Employee;
  end_date: Scalars['String'];
  start_date: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ForgottenPassword = {
  __typename?: 'ForgottenPassword';
  expiration: Scalars['String'];
  key: Scalars['String'];
  userId: Scalars['String'];
};

export type ForgottenPasswordInput = {
  email: Scalars['String'];
};

export type ForgottenPasswordResponse = {
  __typename?: 'ForgottenPasswordResponse';
  data?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Scalars['String']>;
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

export type MeResponse = {
  __typename?: 'MeResponse';
  data?: Maybe<UserCredentials>;
  errors?: Maybe<Array<FieldError>>;
};

export type Paycheck = {
  __typename?: 'Paycheck';
  _id: Scalars['ID'];
  employee: Employee;
  end_date: Scalars['String'];
  salary: Scalars['Float'];
  start_date: Scalars['String'];
};

export type RootMutation = {
  __typename?: 'RootMutation';
  createDepartment: Department;
  createEmployee: Employee;
  createEmployeeTitle: EmployeeTitle;
  createEmployment: Employment;
  createGender: Gender;
  createPaycheck: Paycheck;
  createTitle: Title;
  createUser: CreateUserResponse;
  updateEmployee: Employee;
  updatePassword: UpdatePasswordResponse;
};


export type RootMutationCreateDepartmentArgs = {
  input: CreateDepartmentInput;
};


export type RootMutationCreateEmployeeArgs = {
  input: CreateEmployeeInput;
};


export type RootMutationCreateEmployeeTitleArgs = {
  input: CreateEmployeeTitleInput;
};


export type RootMutationCreateEmploymentArgs = {
  input: CreateEmploymentInput;
};


export type RootMutationCreateGenderArgs = {
  input: CreateGenderInput;
};


export type RootMutationCreatePaycheckArgs = {
  input: CreatePaycheckInput;
};


export type RootMutationCreateTitleArgs = {
  input: CreateTitleInput;
};


export type RootMutationCreateUserArgs = {
  input: CreateUserInput;
};


export type RootMutationUpdateEmployeeArgs = {
  input: UpdateEmployeeInput;
};


export type RootMutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};

export type RootQuery = {
  __typename?: 'RootQuery';
  departments: Array<Department>;
  employee: Employee;
  employees: Employees;
  employeesTitles: Array<EmployeeTitle>;
  employments: Array<Employment>;
  forgottenPassword: ForgottenPasswordResponse;
  genders: Array<Gender>;
  login: AuthResponse;
  logout: Scalars['Boolean'];
  me: MeResponse;
  paychecks: Array<Paycheck>;
  titles: Array<Title>;
  validateResetPasswordLink?: Maybe<ValidateResetPasswordLinkResponse>;
};


export type RootQueryEmployeeArgs = {
  input: GetEmployeeInput;
};


export type RootQueryEmployeesArgs = {
  input?: Maybe<GetEmployeesInput>;
};


export type RootQueryForgottenPasswordArgs = {
  input: ForgottenPasswordInput;
};


export type RootQueryLoginArgs = {
  input: LoginInput;
};


export type RootQueryValidateResetPasswordLinkArgs = {
  input: ValidateResetPasswordLinkInput;
};

export type Title = {
  __typename?: 'Title';
  _id: Scalars['ID'];
  name: Scalars['String'];
};

export type UpdateEmployeeInput = {
  birth_date?: Maybe<Scalars['String']>;
  department?: Maybe<Scalars['ID']>;
  first_name?: Maybe<Scalars['String']>;
  hire_date?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  last_name?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['ID']>;
};

export type UpdatePasswordInput = {
  key: Scalars['String'];
  password: Scalars['String'];
};

export type UpdatePasswordResponse = {
  __typename?: 'UpdatePasswordResponse';
  data?: Maybe<UserCredentials>;
  errors?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  email: Scalars['String'];
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
};

export type UserCredentials = {
  __typename?: 'UserCredentials';
  _id: Scalars['String'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type ValidateResetPasswordLinkInput = {
  key: Scalars['String'];
};

export type ValidateResetPasswordLinkResponse = {
  __typename?: 'ValidateResetPasswordLinkResponse';
  data?: Maybe<ForgottenPassword>;
  errors?: Maybe<Scalars['String']>;
};

export type CreateGenderInput = {
  name: Scalars['String'];
};
