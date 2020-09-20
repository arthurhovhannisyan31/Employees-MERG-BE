// global imports
import express, { Request, Response, NextFunction } from 'express'
import bodyParser from 'body-parser'
import { graphqlHTTP } from 'express-graphql'
import mongoose from 'mongoose'
// local imports
import { schema } from './graphql/schema'
import { resolvers } from './graphql/resolvers'
// todo enable auth check
// import { isAuth } from './graphql/middleware/auth'

const app = express()

app.use(bodyParser.json())
// @ts-ignore
// app.use(isAuth)
// @ts-ignore
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
)

// env vars
const dbName = encodeURI(process.env.MONGO_DB || '')
const PORT = process.env.PORT || 3000

mongoose
  .connect(
    // `mongodb+srv://${userName}:${userPwd}@cluster0.wn6yq.mongodb.net/${dbName}?retryWrites=true`,
    `//mongodb://localhost:27017/${dbName}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => {
    app.listen(PORT)
  })
  .then(() => {
    console.log(`Server started at http://localhost:${PORT}`)
    console.log(
      `Please see graphql environment at http://localhost:${PORT}/graphql`
    )
  })
  .catch((err) => {
    console.log(err)
  })
