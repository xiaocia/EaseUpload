export type Event<K> = {
    change: () => void;
    progress: (progress: number) => void;
    cancel: () => void;
    finished: () => void;
    finishOne: (res: any) => void;
    changeFinish: (payload: {
        file: File;
        fileSize: string;
        resolve: (createTaskList: (file: K extends number ? {
            file: Blob;
            size: number;
            allSize: number;
            chunksNum: number;
            index: number;
            offset: number;
            id: string;
        }[] : {
            file: File;
            id: string;
            size: number;
        }) => (() => Promise<any>)[]) => void;
    }) => void;
};
export type EventName = keyof Event<any>;
