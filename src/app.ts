import MongoStore from 'connect-mongo'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import session from 'express-session'
import mongoose from 'mongoose'

import {
  CONNECT_CONFIG,
  getSessionMdlOptions,
  mongoOptions,
} from './constants/config'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'
import {
  addSecurityHeaders,
  customCorsCheck,
  customFormatError,
} from './utils/helpers'

const main = async (): Promise<void> => {
  const app = express()
  const sessionStore = MongoStore.create({
    mongoUrl: CONNECT_CONFIG.SESSION_DB_CONNECTION_STRING,
    mongoOptions,
    touchAfter: 24 * 3600,
  })

  app.use(customCorsCheck)
  app.use(express.json())
  app.use(
    express.urlencoded({
      extended: true,
    })
  )
  app.set('trust proxy', true)
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
    }))
  )
  app.use(addSecurityHeaders)
  try {
    await mongoose.connect(CONNECT_CONFIG.DB_CONNECTION_STRING, mongoOptions)
    app.listen(CONNECT_CONFIG.PORT)
    if (CONNECT_CONFIG.IS_DEV) {
      console.log(`Server started at http://localhost:${CONNECT_CONFIG.PORT}`)
      console.log(
        `Please see graphql environment at http://localhost:${CONNECT_CONFIG.PORT}/graphql`
      )
    }
  } catch (err) {
    console.log(err)
  }
}

main().catch((err) => {
  console.log(err)
})
