import { Event } from './utils/event';
interface Info {
    fileType: string[];
    chunkSize?: number;
    concurrent?: number;
}
declare const Upload: (info: Info) => {
    show: () => void;
    addListener: <T extends keyof Event<any>>(eventType: T, callback: Event<number | undefined>[T]) => void;
    start: () => Promise<unknown>;
    cancel: () => void;
};
export default Upload;
