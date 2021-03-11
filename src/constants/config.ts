const isDevMode = process.env.NODE_ENV === 'development'
const getConnectionString = () =>
  isDevMode
    ? `//mongodb://localhost:27017/${process.env.DB_NAME}`
    : `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.oxr6p.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

export const config = {
  PORT: process.env.PORT ?? '',
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY ?? '',
  IS_DEV: isDevMode,
  CONNECTION_STRING: getConnectionString(),
}
