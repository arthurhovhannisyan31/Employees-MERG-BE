export const __prod__ = process.env.NODE_ENV === 'development'
const getConnectionString = () =>
  __prod__
    ? `//mongodb://localhost:27017/${process.env.DB_NAME}`
    : `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.oxr6p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

export const CONFIG = {
  PORT: process.env.PORT ?? '',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY ?? '',
  IS_DEV: __prod__,
  CONNECTION_STRING: getConnectionString(),
}
