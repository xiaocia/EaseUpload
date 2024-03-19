export type Event = {
    change: () => void;
    progress: () => void;
    changeFinish: (payload: {
        file: File;
        fileSize: string;
        resolve: (createTaskList: (chunks: Chunk[]) => Task[]) => void;
    }) => void;
};
export type EventName = keyof Event;
