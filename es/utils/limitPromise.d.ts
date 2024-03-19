import { Emitter } from 'emitter-tiny';
export type task = () => Promise<any>;
declare const limitPromise: (taskArr: task[], event: Emitter, limit?: number) => void;
export default limitPromise;
