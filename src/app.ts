// deps
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'
// helpers
import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import { customCorsCheck, customFormatError } from './utils/helpers'
import { CONNECT_CONFIG, getSessionMdlOptions, mongoOptions } from './constants'

const main = async (): Promise<void> => {
  const app = express()
  const sessionStore = MongoStore.create({
    mongoUrl: CONNECT_CONFIG.SESSION_DB_CONNECTION_STRING,
    mongoOptions,
    touchAfter: 24 * 3600,
  })

  app.use(customCorsCheck)
  app.use(bodyParser.json())
  app.use(session(getSessionMdlOptions(sessionStore)))
  app.use(
    '/graphql',
    graphqlHTTP((req, res) => ({
      schema,
      rootValue: resolvers,
      graphiql: CONNECT_CONFIG.IS_DEV,
      customFormatErrorFn: customFormatError,
      context: {
        req,
        res,
        sessionStore,
      },
    })),
  )
  try {
    await mongoose.connect(CONNECT_CONFIG.DB_CONNECTION_STRING, mongoOptions)
    await app.listen(CONNECT_CONFIG.PORT)
    console.log(`Server started at http://localhost:${CONNECT_CONFIG.PORT}`)
    console.log(
      `Please see graphql environment at http://localhost:${CONNECT_CONFIG.PORT}/graphql`,
    )
  } catch (err) {
    console.log(err)
  }
}

main().catch((err) => {
  console.log(err)
})
