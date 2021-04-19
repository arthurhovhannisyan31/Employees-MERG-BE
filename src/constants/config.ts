// model
import { IConnectConfig } from '../models/config'

export const __PROD__ = process.env.NODE_ENV === 'production'
const getConnectionString = (dbName: string): string =>
  __PROD__
    ? `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.oxr6p.mongodb.net/${dbName}?retryWrites=true&w=majority`
    : `//mongodb://localhost:27017/${dbName}`

export const CONNECT_CONFIG: IConnectConfig = {
  PORT: process.env.PORT ?? '',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY ?? '',
  IS_DEV: !__PROD__,
  DB_CONNECTION_STRING: getConnectionString(process.env.DB_NAME || ''),
  SESSION_DB_CONNECTION_STRING: getConnectionString(
    process.env.SESSION_DB_NAME || '',
  ),
}

export const mongoOptions: Record<string, boolean> = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}
