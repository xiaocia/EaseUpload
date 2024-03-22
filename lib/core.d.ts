import { Event } from './utils/event';
interface Info {
    fileType: string[];
    chunkSize?: number;
    concurrent?: number;
}
declare const Upload: (info: Info) => {
    show: () => void;
    addListener: <T extends keyof Event>(eventType: T, callback: Event[T]) => void;
    start: () => Promise<unknown>;
    cancel: () => void;
    chunks: {};
};
export default Upload;
