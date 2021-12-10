export interface IConnectConfig {
  PORT: string
  AUTH_SECRET_KEY: string
  IS_DEV: boolean
  DB_CONNECTION_STRING: string
  SESSION_DB_CONNECTION_STRING: string
}

export interface HttpsOptions {
  key: Buffer
  cert: Buffer
}
