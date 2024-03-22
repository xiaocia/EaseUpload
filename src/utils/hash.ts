import md5 from 'spark-md5'

const hash = (chunks: Chunk[] | { file: File; id: string; size: number }) => {
  return new Promise<string>(resolve => {
    const _chunks: (Chunk | { file: Blob; id: string; size: number })[] = []

    if ('length' in chunks) {
      // 分片
      for (const i in chunks) {
        if (i === 0 + '' || i === chunks.length - 1 + '') {
          _chunks.push(chunks[i])
        } else {
          const file = chunks[i].file
          _chunks.push({ ...chunks[i], file: file.slice(0, 2) })
          _chunks.push({ ...chunks[i], file: file.slice(~~(file.size / 2), ~~(file.size / 2) + 2) })
          _chunks.push({ ...chunks[i], file: file.slice(file.size - 2, file.size) })
        }
      }
    } else {
      //不分片但是文件小
      if (chunks.size < 1024 * 1024 * 10) {
        _chunks.push(chunks)
      } else {
        // 不分片且文件大
        const file = chunks.file
        _chunks.push({ ...chunks, file: file.slice(0, 1024 * 1024 * 2) })
        _chunks.push({ ...chunks, file: file.slice(~~(file.size / 2), ~~(file.size / 2) + 1024 * 1024 * 2) })
        _chunks.push({ ...chunks, file: file.slice(file.size - 1024 * 1024 * 2, file.size) })
      }
    }

    const spark = new md5()

    const time1 = new Date().valueOf()
    const _read = (i: number) => {
      if (i >= _chunks.length) {
        const hashVal = spark.end(false)
        console.log('计算hash用时:', (new Date().valueOf() - time1) / 1000)
        resolve(hashVal)
        return
      }

      const blob = _chunks[i].file
      const reader = new FileReader()
      reader.onload = e => {
        const bytes = e.target!.result as string
        bytes && spark.append(bytes)
        _read(i + 1)
      }
      reader.readAsText(blob)
    }

    _read(0)
  })
}

export default hash
