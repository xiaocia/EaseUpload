import emitter from 'emitter-tiny'

import createChunks from './utils/sliceFile'
import hash from './utils/hash'
import LimitPromise from './utils/limitPromise'
import { Event, EventName } from './utils/event'

const createInput = (fileType?: string[]) => {
  const input = document.createElement('input')
  input.type = 'file'
  fileType && (input.accept = fileType?.join())
  input.style.display = 'none'
  document.getElementsByTagName('body')[0].appendChild(input)

  return input
}
const formatFileSize = (bit: number): string => {
  if (bit < 1024 * 1024) {
    return (bit / 1024).toFixed(2) + ' KB'
  } else if (bit < 1024 * 1024 * 1024) {
    return (bit / 1024 / 1024).toFixed(2) + ' MB'
  } else if (bit < 1024 * 1024 * 1024 * 1024) {
    return (bit / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  }
  return ''
}

let taskArr: Task[] = []
const Upload = (info: { fileType: string[]; chunkSize: number | boolean; concurrent: number }) => {
  const event = new emitter()

  const input = createInput(info.fileType)

  let chunks: Chunk[] = []

  const show = () => input.click()

  input.onchange = () => {
    const file = input.files![0]

    new Promise<(chunks: Chunk[]) => Task[]>(resolve => {
      event.emit('change', null)
      if (typeof info.chunkSize === 'number') {
        // 配置了切片
        if (file.size < info.chunkSize * 1024 * 1024) return console.error('文件比切片小')

        // 开始切片
        chunks = createChunks(file, info.chunkSize)
      } else if (info.chunkSize === false) {
        chunks = [
          {
            file: file,
            size: file.size,
            allSize: file.size,
            chunksNum: 1,
            index: 0,
            offset: 0,
            id: ''
          }
        ]
      }

      // 计算hash
      hash(chunks).then(hash => {
        // 根据hash更改每个分片的id
        chunks = chunks.map((e, i) => ({ ...e, id: `${hash}-${i}` }))

        // hash计算完毕，得到用户处理的taskArr
        event.emit('changeFinish', {
          file,
          fileSize: formatFileSize(file.size),
          resolve
        })
      })
    }).then(res => {
      taskArr = res ? res(chunks) : []
    })
  }

  const addListener = <T extends EventName>(eventType: T, callback: Event[T]) => {
    event.on(eventType, callback)
  }

  const start = () => {
    console.log('开始传输！')
    if (taskArr.length === 0) return
    LimitPromise(taskArr, event, info.concurrent)
  }

  return { show, addListener, start }
}

export default Upload
