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
var spark_md5_1 = __importDefault(require("spark-md5"));
var hash = function (chunks) {
    return new Promise(function (resolve) {
        var _chunks = [];
        for (var i in chunks) {
            if (i === 0 + '' || i === chunks.length - 1 + '') {
                _chunks.push(chunks[i]);
            }
            else {
                var file = chunks[i].file;
                _chunks.push(__assign(__assign({}, chunks[i]), { file: file.slice(0, 2) }));
                _chunks.push(__assign(__assign({}, chunks[i]), { file: file.slice(file.size / 2, file.size / 2 + 2) }));
                _chunks.push(__assign(__assign({}, chunks[i]), { file: file.slice(file.size, file.size + 2) }));
            }
        }
        var spark = new spark_md5_1.default();
        var time1 = new Date().valueOf();
        var _read = function (i) {
            if (i >= _chunks.length) {
                var hashVal = spark.end(false);
                console.log('用时：', (new Date().valueOf() - time1) / 1000);
                resolve(hashVal);
                return;
            }
            var blob = _chunks[i].file;
            var reader = new FileReader();
            reader.onload = function (e) {
                var bytes = e.target.result;
                bytes && spark.append(bytes);
                _read(i + 1);
            };
            reader.readAsText(blob);
        };
        _read(0);
    });
};
exports.default = hash;
