# v0.2.0
## Code refactor, unit tests, controller tests
- Configs
- - Add jest configs
- - Add conventional commits
- - Add precommit and prepush git hooks
- Test
- - Add tests for models
- - Add auth resolver tests
- DevEpx
- - Run husky hooks for push and commit

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
