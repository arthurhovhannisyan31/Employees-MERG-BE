export enum EErrorName {
  UNAUTHORIZED = 'UNAUTHORIZED',
}

export const errorTypeMap = {
  [EErrorName.UNAUTHORIZED]: {
    message: 'Unauthorized',
    statusCode: 401
  }
}
