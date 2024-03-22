"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var emitter_tiny_1 = __importDefault(require("emitter-tiny"));
var sliceFile_1 = __importDefault(require("./utils/sliceFile"));
var hash_1 = __importDefault(require("./utils/hash"));
var limitPromise_1 = __importDefault(require("./utils/limitPromise"));
var createInput = function (fileType) {
    var input = document.createElement('input');
    input.type = 'file';
    fileType && (input.accept = fileType === null || fileType === void 0 ? void 0 : fileType.join());
    input.style.display = 'none';
    document.getElementsByTagName('body')[0].appendChild(input);
    return input;
};
var formatFileSize = function (bit) {
    if (bit < 1024 * 1024) {
        return (bit / 1024).toFixed(2) + ' KB';
    }
    else if (bit < 1024 * 1024 * 1024) {
        return (bit / 1024 / 1024).toFixed(2) + ' MB';
    }
    else if (bit < 1024 * 1024 * 1024 * 1024) {
        return (bit / 1024 / 1024 / 1024).toFixed(2) + ' GB';
    }
    return '';
};
var taskArr = [];
var Upload = function (info) {
    var event = new emitter_tiny_1.default();
    var fileType = info.fileType, chunkSize = info.chunkSize, concurrent = info.concurrent;
    var input = createInput(fileType);
    var chunks;
    var file;
    var show = function () { return input.click(); };
    input.onchange = function () {
        file = input.files[0];
        new Promise(function (resolve) {
            event.emit('change', null);
            if (typeof chunkSize === 'number') {
                // 配置了切片
                if (file.size < chunkSize * 1024 * 1024)
                    return console.error('文件比切片小');
                // 开始切片
                chunks = (0, sliceFile_1.default)(file, info.chunkSize);
            }
            else {
                chunks = { file: file, size: file.size, id: '' };
            }
            // 计算hash
            (0, hash_1.default)(chunks).then(function (hash) {
                // 根据hash更改每个分片的id
                if ('length' in chunks) {
                    chunks = chunks.map(function (e, i) { return (__assign(__assign({}, e), { id: "".concat(hash, "-").concat(i) })); });
                }
                else {
                    chunks = __assign(__assign({}, chunks), { id: hash });
                }
                // hash计算完毕，得到用户处理的taskArr
                event.emit('changeFinish', {
                    file: file,
                    fileSize: formatFileSize(file.size),
                    resolve: resolve
                });
            });
        }).then(function (res) {
            taskArr = res ? res(chunks) : [];
        });
    };
    var addListener = function (eventType, callback) {
        event.on(eventType, callback);
    };
    var start = function () {
        return new Promise(function (resolve) {
            console.log('开始传输！');
            if (taskArr.length === 0)
                return;
            (0, limitPromise_1.default)(taskArr, event, concurrent !== null && concurrent !== void 0 ? concurrent : 1);
            event.on('finished', function (res) { return resolve(res); });
        });
    };
    var cancel = function () {
        file = null;
        input.remove();
        event.emit('cancel', null);
    };
    return { show: show, addListener: addListener, start: start, cancel: cancel, chunks: chunkSize ? [] : {} };
};
exports.default = Upload;
