export const getMergedObject =
  <T extends Record<string, unknown>>(data: T) =>
  (partialData?: Partial<T>): T => ({
    ...data,
    ...partialData,
  })
