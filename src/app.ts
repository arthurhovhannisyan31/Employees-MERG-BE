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
import { getErrorCode } from './utils/helpers'
import { EErrorName } from './constants/error'
import { config } from './constants/config'

const app = express()

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
    graphiql: config.IS_DEV,
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
mongoose
  .connect(config.CONNECTION_STRING, {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(config.PORT)
  })
  .then(() => {
    console.log(`Server started at http://localhost:${config.PORT}`)
    console.log(
      `Please see graphql environment at http://localhost:${config.PORT}/graphql`,
    )
  })
  .catch((err) => {
    console.log(err)
  })
