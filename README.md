# Employees server

## Description
- Project implements graphql server for Employees project. 
- MongoDB is primary data storage. 
- User personal data stored using encryption.
- Authentication processed by providing login and password. 
- Authorization processed by checking cookies in query headers. 

## Technologies
- The server is written using express and express-graphql.
- Database manipulation handled using mongoose.
- Database connection handled using connect-mongo.
- Dataloader handles all repeated sub-queries while resolving main query.  
- Project implements user sessions with expiration time of 24h.

### Start with `yarn start:dev`

#### Organize imports using following order
1. deps
2. components
3. model
4. helpers
