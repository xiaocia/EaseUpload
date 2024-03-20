export type Event<T = any> = {
  change: () => void
  progress: (progress: number) => void
  cancel: () => void
  finished: () => void
  finishOne: (res: T) => void
  changeFinish: (payload: {
    file: File
    fileSize: string
    resolve: (
      createTaskList: (
        chunks: {
          file: Blob
          size: number
          allSize: number
          chunksNum: number
          index: number
          offset: number
          id: string
        }[]
      ) => (() => Promise<T>)[]
    ) => void
  }) => void
}

export type EventName = keyof Event
