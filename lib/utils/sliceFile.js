"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createChunks = function (file, sizeNum) {
    if (sizeNum === void 0) { sizeNum = 5; }
    var size = sizeNum * 1024 * 1024;
    var name = file.name;
    console.log(name);
    //两个形参：file是大文件，size是切片的大小
    var chunkList = [];
    var offset = 0, index = 0;
    var chunksNum = Math.ceil(file.size / size);
    while (offset < file.size) {
        chunkList.push({
            file: file.slice(offset, offset + size, name),
            allSize: file.size,
            id: '',
            size: size,
            chunksNum: chunksNum,
            index: index,
            offset: offset
        });
        offset += size;
        index++;
    }
    return chunkList;
};
exports.default = createChunks;
