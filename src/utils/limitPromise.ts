import { Emitter } from 'emitter-tiny'
export type task = () => Promise<any>

const limitPromise = (taskArr: task[], event: Emitter, limit = 6) => {
  // 所有的任务
  let allTask = [...taskArr]

  // 总进度
  const allProgress = allTask.length
  // 完成的
  let finishedTask = 0

  // 最大并发数
  const max = Math.min(allTask.length, limit)

  // 正在并发数
  let runningTaskNum = 0

  const taskRun = () => {
    const task = allTask.shift()
    task && runner(task)
  }

  const next = () => {
    if (runningTaskNum < max && allTask.length !== 0) {
      taskRun()
    }
  }

  const runner = async (task: task) => {
    // 正在运行数+1
    runningTaskNum++
    const res = await task()
    event.emit('finishOne', res)

    // 执行完了，运行数-1，更新进度并捞取下一个
    runningTaskNum--
    if (allTask.length === 0 && runningTaskNum === 0) {
      event.emit('finished', res)
    }
    finishedTask++
    event.emit('progress', ((finishedTask / allProgress) * 100).toFixed(2))
    next()
  }

  event.on('cancel', () => {
    allTask = []
  })

  while (runningTaskNum < max) {
    taskRun()
  }
}

export default limitPromise
