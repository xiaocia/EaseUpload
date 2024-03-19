/// <reference types="vite/client" />

type Task = () => Promise<any>

type Chunk = {
  file: Blob
  size: number
  allSize: number
  chunksNum: number
  index: number
  offset: number
  id: string
}
