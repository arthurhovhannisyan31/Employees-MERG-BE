import http from 'http'
import https from 'https'

import MongoStore from 'connect-mongo'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import session from 'express-session'
import mongoose from 'mongoose'

import {
  __PROD__,
  CONNECT_CONFIG,
  getSessionMdlOptions,
  httpsOptions,
  mongoOptions,
} from './constants/config'
import { resolvers } from './graphql/resolvers'
import { schema } from './graphql/schema'
import {
  addSecurityHeaders,
  customCorsCheck,
  customFormatError,
  redirectToHttps,
  redirectToRoot,
} from './utils/helpers'

const main = async (): Promise<void> => {
  const rootApp = express()
  const httpsApp = express()
  const httpApp = express()

  const sessionStore = MongoStore.create({
    mongoUrl: CONNECT_CONFIG.SESSION_DB_CONNECTION_STRING,
    mongoOptions,
    touchAfter: 24 * 3600,
  })

  httpsApp.set('port', process.env.HTTPS_PORT || 443)
  httpsApp.use(redirectToRoot)

  httpApp.set('port', process.env.HTTP_PORT || 80)
  httpApp.use(redirectToHttps)

  rootApp.set('port', process.env.ROOT_PORT || 4002)
  rootApp.set('trust proxy', true)
  rootApp.use(customCorsCheck)
  rootApp.use(express.json())
  rootApp.use(
    express.urlencoded({
      extended: true,
    })
  )
  rootApp.use(session(getSessionMdlOptions(sessionStore)))
  rootApp.use(
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
  rootApp.use(addSecurityHeaders)
  try {
    await mongoose.connect(CONNECT_CONFIG.DB_CONNECTION_STRING, mongoOptions)
    http.createServer(httpApp).listen(httpApp.get('port'), () => {
      if (!__PROD__) {
        console.log(
          `HTTP server started at http://localhost:${httpApp.get('port')}`
        )
      }
    })
    https
      .createServer(httpsOptions, httpsApp)
      .listen(httpsApp.get('port'), () => {
        if (!__PROD__) {
          console.log(
            `HTTPS server started at https://localhost:${httpsApp.get('port')}`
          )
        }
      })
    rootApp.listen(rootApp.get('port'))

    if (!__PROD__) {
      console.log(
        `GraphQL server started at http://localhost:${rootApp.get('port')}`
      )
      console.log(
        `Please see graphql environment at http://localhost:${rootApp.get(
          'port'
        )}/graphql`
      )
    }
  } catch (err) {
    console.log(err)
  }
}

main().catch((err) => {
  console.log(err)
})
