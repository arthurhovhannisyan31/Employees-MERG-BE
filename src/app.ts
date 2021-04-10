// deps
import express from 'express'
import bodyParser from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
// helpers
import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
import { isAuth } from './graphql/middleware/auth'
import { customCorsCheck, customFormatError } from './utils/helpers'
import { CONFIG } from './constants/config'

const app = express()

app.use(customCorsCheck)
app.use(bodyParser.json())
app.use(isAuth)

app.use(
  '/graphql',
  graphqlHTTP((req, res) => ({
    schema,
    rootValue: resolvers,
    graphiql: CONFIG.IS_DEV,
    customFormatErrorFn: customFormatError,
    context: {
      req,
      res,
    },
  })),
)
async function connect(): Promise<void> {
  try {
    await mongoose.connect(CONFIG.CONNECTION_STRING, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    await app.listen(CONFIG.PORT)
    console.log(`Server started at http://localhost:${CONFIG.PORT}`)
    console.log(
      `Please see graphql environment at http://localhost:${CONFIG.PORT}/graphql`,
    )
  } catch (err) {
    console.log(err)
  }
}
connect()
