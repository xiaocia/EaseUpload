# 📄 easeupload

## 快速开始

### 1. 安装
  * 使用 npm 安装
  ```shell
  npm install easeupload
  ```
  * 使用 yarn 安装
  ```shell
  yarn add easeupload
  ```
-  使用 pnpm 安装

  ```shell
  pnpm add easeupload
  ```
### 2. 使用 easeupload 上传文件切片
```tsx
import Upload from 'easeupload'
const { show, addListener, start } = Upload({
  fileType: ['.zip'], // 文件类型
  chunkSize: 3, // 分片的大小
  concurrent: 1, // 并发请求数
})

 addListener('progress', num => {
  	// TODO
  })

 addListener('changeFinish', ({ file, fileSize, resolve }) => {
    // 文件hash计算完成，自定义请求的参数
    resolve(chunks => {
      return chunks.map(chunk => () => {
        const data = new FormData()
        for (const key in chunk) {
          data.append(key, chunk[key])
        }
        return axios({
          url: '***',
          method: 'post',
          data,
        })
      })
    })
  })
```
## 🔥🔥🔥 特点
1. 简单
2. 自由
4. 轻量
5. 类型提示良好

### API文档

#### 默认导出
`upload`函数，返回 `show、 addListener、start` 函数

1. Upload 参数

| 参数名   | 类型            | 必传  | 说明 |
|------| --------------- | ----- | ---------------- |
| config | { fileType: string[]; chunkSize: number;concurrent: number;} | true | fileType： 可选择文件类型的数组<br />chunkSize： 分片的大小（MB）<br />concurrent：并发上传数 |

2. 返回值

| 返回值      | 类型                                                         | 说明                   |
| ----------- | ------------------------------------------------------------ | ---------------------- |
| show        | （） => void                                                 | 调用显示选择文件的弹窗 |
| addListener | （eventName： 'progress' \| 'change'\| 'changeFinish'，**handleFn**） | 增加监听               |
| start       | （） => void                                                 | 开始上传               |

#### addListener

可监听事件
1. `progress`

| 事件名 | 参数类型          | 说明 |
| ------ | --------------- | ----- |
| progress | number | 上传的进度（已经上传完成的切片 / 总切片数） |

2.  `change`

| 事件名 | 参数          | 说明 |
| ------ | --------------- | ----- |
| change | undefined | 选择文件后触发 |

3.  `changeFinish`

| 事件名       | 参数                                                         | 说明                                                         |
| ------------ | ------------------------------------------------------------ | :----------------------------------------------------------- |
| changeFinish | ({ *file*: File, *fileSize*: string, **resolve**: (**createTaskList**: (*chunks*: Chunk[]) => Task[]) => void }) | 在文件的hash值和切片的hash计算完毕后触发，**必须增加此监听，调用resolve函数，自定义切片上传的请求字段名，使用封装axios，拦截器依旧生效** |
