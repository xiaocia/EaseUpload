import md5 from 'spark-md5'

const hash = (chunks: Chunk[]) => {
  return new Promise<string>(resolve => {
    const _chunks: Chunk[] = []
    for (const i in chunks) {
      if (i === 0 + '' || i === chunks.length - 1 + '') {
        _chunks.push(chunks[i])
      } else {
        const file = chunks[i].file
        _chunks.push({ ...chunks[i], file: file.slice(0, 2) })
        _chunks.push({ ...chunks[i], file: file.slice(file.size / 2, file.size / 2 + 2) })
        _chunks.push({ ...chunks[i], file: file.slice(file.size, file.size + 2) })
      }
    }

    const spark = new md5()

    const time1 = new Date().valueOf()
    const _read = (i: number) => {
      if (i >= _chunks.length) {
        const hashVal = spark.end(false)
        console.log('用时：', (new Date().valueOf() - time1) / 1000)
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
