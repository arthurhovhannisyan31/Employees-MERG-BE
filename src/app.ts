// deps
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import { GraphQLError } from 'graphql'
// helpers
import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import { isAuth } from './graphql/middleware/auth'
import { getErrorCode } from './graphql/utils/helpers'
import { EErrorName } from './graphql/constants/error'

const app = express()

// todo add me resolver and check authorization

app.use(bodyParser.json())
app.use(isAuth)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  return next()
})
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === 'development',
    customFormatErrorFn: (err: GraphQLError) => {
      if (err.message in EErrorName) {
        const error = getErrorCode(
          EErrorName[err.message as keyof typeof EErrorName],
        )
        return {
          message: error.message,
          statusCode: error.statusCode,
        }
      }
      return err
    },
  }),
)

// env vars
const dbName = encodeURI(process.env.MONGO_DB || '')
const PORT = process.env.PORT || 3000

// const userName = 'events_booking_owner'
// const userPwd = 'events_booking_owner'
mongoose
  .connect(
    // `mongodb+srv://${userName}:${userPwd}@cluster0.wn6yq.mongodb.net/${dbName}?retryWrites=true`,
    `//mongodb://localhost:27017/${dbName}`,
    {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
  )
  .then(() => {
    app.listen(PORT)
  })
  .then(() => {
    console.log(`Server started at http://localhost:${PORT}`)
    console.log(
      `Please see graphql environment at http://localhost:${PORT}/graphql`,
    )
  })
  .catch((err) => {
    console.log(err)
  })
