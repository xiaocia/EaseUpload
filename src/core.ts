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

let taskArr: (() => Promise<any>)[] = []
interface Info {
  fileType: string[]
  chunkSize?: number
  concurrent?: number
}
const Upload = (info: Info) => {
  const event = new emitter()
  const { fileType, chunkSize, concurrent } = info

  const input = createInput(fileType)

  type chunk<K> = K extends number
    ? {
        file: Blob
        size: number
        allSize: number
        chunksNum: number
        index: number
        offset: number
        id: string
      }[]
    : { file: File; id: string; size: number }

  let chunks: chunk<typeof chunkSize>
  let file: any

  const show = () => input.click()

  input.onchange = () => {
    file = input.files![0]

    new Promise<
      <T>(
        chunks: T extends any[]
          ? {
              file: Blob
              size: number
              allSize: number
              chunksNum: number
              index: number
              offset: number
              id: string
            }[]
          : { file: File; id: string; size: number }
      ) => (() => Promise<any>)[]
    >(resolve => {
      event.emit('change', null)
      if (typeof chunkSize === 'number') {
        // 配置了切片
        if (file.size < chunkSize * 1024 * 1024) return console.error('文件比切片小')

        // 开始切片
        chunks = createChunks(file, info.chunkSize)
      } else {
        chunks = { file: file, size: file.size, id: '' }
      }

      // 计算hash
      hash(chunks).then(hash => {
        // 根据hash更改每个分片的id
        if ('length' in chunks) {
          chunks = chunks.map((e, i) => ({ ...e, id: `${hash}-${i}` }))
        } else {
          chunks = { ...chunks, id: hash }
        }

        // hash计算完毕，得到用户处理的taskArr
        event.emit('changeFinish', {
          file,
          fileSize: formatFileSize(file.size),
          resolve
        })
      })
    }).then(res => {
      taskArr = res ? res<typeof chunks>(chunks) : []
    })
  }

  const addListener = <T extends EventName>(eventType: T, callback: Event<typeof chunkSize>[T]) => {
    event.on(eventType, callback)
  }

  const start = () => {
    return new Promise(resolve => {
      console.log('开始传输！')
      if (taskArr.length === 0) return
      LimitPromise(taskArr, event, concurrent ?? 1)
      event.on('finished', res => resolve(res))
    })
  }

  const cancel = () => {
    file = null
    input.remove()
    event.emit('cancel', null)
  }

  return { show, addListener, start, cancel }
}

export default Upload
