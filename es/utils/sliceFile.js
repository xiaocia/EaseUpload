const createChunks = (file, sizeNum = 5) => {
    const size = sizeNum * 1024 * 1024;
    //两个形参：file是大文件，size是切片的大小
    const chunkList = [];
    let offset = 0, index = 0;
    const chunksNum = Math.ceil(file.size / size);
    while (offset < file.size) {
        chunkList.push({
            file: file.slice(offset, offset + size),
            allSize: file.size,
            id: '',
            size,
            chunksNum,
            index,
            offset
        });
        offset += size;
        index++;
    }
    return chunkList;
};
export default createChunks;
