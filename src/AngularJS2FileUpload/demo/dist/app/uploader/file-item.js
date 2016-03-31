System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var FileItem;
    return {
        setters:[],
        execute: function() {
            FileItem = (function () {
                function FileItem(file, _uploader) {
                    this.file = file;
                    this._uploader = _uploader;
                    this.alias = 'file';
                    this.method = 'POST';
                    this.url = '/';
                    this._file = file;
                    this._file['humanSize'] = this.getHumanFileSize(this._file.size);
                    this.url = _uploader.url;
                }
                FileItem.prototype.upload = function () {
                    this._uploader.uploadItem(this);
                };
                FileItem.prototype.remove = function () {
                    this._uploader.removeFromQueue(this);
                };
                FileItem.prototype.getHumanFileSize = function (size) {
                    var sizes = ['n/a', 'bytes', 'KiB', 'MiB', 'GiB'];
                    var i = Math.floor(Math.log(size) / Math.log(1024));
                    return (size / Math.pow(1024, i)).toFixed(i ? 1 : 0) + sizes[isNaN(size) ? 0 : i + 1];
                };
                return FileItem;
            }());
            exports_1("FileItem", FileItem);
        }
    }
});
//# sourceMappingURL=file-item.js.map