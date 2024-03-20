var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const limitPromise = (taskArr, event, limit = 6) => {
    // 所有的任务
    let allTask = [...taskArr];
    // 总进度
    const allProgress = allTask.length;
    // 完成的
    let finishedTask = 0;
    // 最大并发数
    const max = Math.min(allTask.length, limit);
    // 正在并发数
    let runningTaskNum = 0;
    const taskRun = () => {
        const task = allTask.shift();
        task && runner(task);
    };
    const next = () => {
        if (runningTaskNum < max && allTask.length !== 0) {
            taskRun();
        }
    };
    const runner = (task) => __awaiter(void 0, void 0, void 0, function* () {
        // 正在运行数+1
        runningTaskNum++;
        const res = yield task();
        event.emit('finishOne', res);
        // 执行完了，运行数-1，更新进度并捞取下一个
        runningTaskNum--;
        if (allTask.length === 0 && runningTaskNum === 0) {
            event.emit('finished', res);
        }
        finishedTask++;
        event.emit('progress', ((finishedTask / allProgress) * 100).toFixed(2));
        next();
    });
    event.on('cancel', () => {
        allTask = [];
    });
    while (runningTaskNum < max) {
        taskRun();
    }
};
export default limitPromise;
