import fs from 'fs'
import path from 'path'

import MongoStore from 'connect-mongo'
import { SessionOptions } from 'express-session'

import { HttpsOptions, IConnectConfig } from '../models/config'
import { COOKIE_NAME, cookieOptions } from './auth'

export const __PROD__ = process.env.NODE_ENV === 'production'
const getConnectionString = (dbName: string): string =>
  __PROD__
    ? `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.oxr6p.mongodb.net/${dbName}?retryWrites=true&w=majority`
    : // : `mongodb://localhost:27017/${dbName}`
      `mongodb://host.docker.internal:27017/${dbName}`

export const CONNECT_CONFIG: IConnectConfig = {
  PORT: process.env.PORT ?? '',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY ?? '',
  IS_DEV: !__PROD__,
  DB_CONNECTION_STRING: getConnectionString(process.env.DB_NAME || ''),
  SESSION_DB_CONNECTION_STRING: getConnectionString(
    process.env.SESSION_DB_NAME || ''
  ),
}

export const mongoOptions: Record<string, boolean> = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

export const getSessionMdlOptions = (store: MongoStore): SessionOptions => ({
  name: COOKIE_NAME,
  secret: CONNECT_CONFIG.AUTH_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: cookieOptions,
  store,
})

export const httpsOptions: HttpsOptions = {
  key: fs.readFileSync(path.resolve('configs', 'cert', 'key.pem')),
  cert: fs.readFileSync(path.resolve('configs', 'cert', 'cert.pem')),
}
