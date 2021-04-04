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
import { config } from './constants/config'

const app = express()

app.use(customCorsCheck)
app.use(bodyParser.json())
app.use(isAuth)

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: config.IS_DEV,
    customFormatErrorFn: customFormatError,
  }),
)
async function connect() {
  try {
    await mongoose.connect(config.CONNECTION_STRING, {
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    await app.listen(config.PORT)
    console.log(`Server started at http://localhost:${config.PORT}`)
    console.log(
      `Please see graphql environment at http://localhost:${config.PORT}/graphql`,
    )
  } catch (err) {
    console.log(err)
  }
}
connect()
