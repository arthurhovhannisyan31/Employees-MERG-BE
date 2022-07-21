# v0.1..
## Code refactor, unit tests

# v0.1.3
## Code refactor, Authorization improvements
- Configs
- - Extract typescript configs to configs folder
- Linter
- - Add Eslint groups, imports validation rules,
- - Add import cycle dependencies checks
- DevExp
- - Add staged files linting on pre-commit
- - Add types generation
- Resolvers
- - Add change password resolver
- - Add send password recovery link
- - Add forgotten password resolver

# v0.1.2
## Authorization improvements
- Add cookies authorization
- Add user sessions

# v0.1.0
## Init release
- Add login and req auth check
- Add entities model:
  Employee,
  Employment,
  EmployeeTitle,
  Department,
  Gender,
  Paycheck,
  User,
  Title
- Add entities crud methods
- Add data-loaders for repeating sub-request   
- Add error format handler  
- Deploy to heroku  
