export type Event = {
  change: () => void
  progress: (progress: string) => void
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
      ) => (() => Promise<any>)[]
    ) => void
  }) => void
}

export type EventName = keyof Event
