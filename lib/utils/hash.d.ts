declare const hash: (chunks: Chunk[] | {
    file: File;
    id: string;
    size: number;
}) => Promise<string>;
export default hash;
