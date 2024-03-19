import { Event } from './utils/event';
declare const Upload: (info: {
    fileType: string[];
    chunkSize: number | boolean;
    concurrent: number;
}) => {
    show: () => void;
    addListener: <T extends keyof Event>(eventType: T, callback: Event[T]) => void;
    start: () => void;
};
export default Upload;
