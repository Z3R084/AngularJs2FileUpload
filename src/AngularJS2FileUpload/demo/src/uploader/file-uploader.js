System.register(['./file-item'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var file_item_1;
    var FileUploader;
    return {
        setters:[
            function (file_item_1_1) {
                file_item_1 = file_item_1_1;
            }],
        execute: function() {
            FileUploader = (function () {
                function FileUploader(options) {
                    this.options = options;
                    this.queue = [];
                    this.filters = [];
                    this.url = '/';
                    this.removeAfterUpload = false;
                    this.progress = 0;
                    this.url = options.url;
                    console.log(this.url);
                }
                FileUploader.prototype.addToQueue = function (files) {
                    var _this = this;
                    var list = [];
                    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                        var file = files_1[_i];
                        list.push(file);
                    }
                    var addedFileItems = [];
                    list.map(function (some) {
                        var fileItem = new file_item_1.FileItem(some, _this);
                        //addedFileItems.push(some);
                        _this.queue.push(fileItem);
                    });
                };
                FileUploader.prototype.removeFromQueue = function (file) {
                    var index = this.queue.indexOf(file);
                    this.queue.splice(index, 1);
                };
                FileUploader.prototype.uploadItem = function (file) {
                    //let index = this.queue.indexOf(file);
                    this._xhrTransport(file);
                };
                FileUploader.prototype.getNotUploadedItems = function () {
                    return this.queue.filter(function (item) { return !item.isUploaded; });
                };
                FileUploader.prototype.onProgressItem = function (fileItem, progress) {
                };
                FileUploader.prototype.onProgressAll = function (progress) {
                };
                FileUploader.prototype._xhrTransport = function (file) {
                    var _this = this;
                    var xhr = file._xhr = new XMLHttpRequest();
                    var form = new FormData();
                    form.append(file.alias, file._file, file._file.name);
                    xhr.upload.onprogress = function (event) {
                        var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
                        _this._onProgressItem(file, progress);
                    };
                    xhr.upload.onload = function () {
                        console.log('finished');
                        _this._onCompleteItem(file, xhr.status);
                    };
                    xhr.onerror = function (event) {
                        console.log(event.target);
                    };
                    xhr.open(file.method, file.url, true);
                    xhr.send(form);
                };
                FileUploader.prototype._onProgressItem = function (item, progress) {
                    var total = this._getTotalProgress(progress);
                    this.progress = total;
                    item.onProgress(progress);
                    console.log('Progress: ' + progress);
                    this.onProgressItem(item, progress);
                    this.onProgressAll(total);
                };
                FileUploader.prototype._onCompleteItem = function (file, status) {
                    file.onProgress(100);
                    console.log('file finished');
                };
                FileUploader.prototype._getTotalProgress = function (value) {
                    if (value === void 0) { value = 0; }
                    if (this.removeAfterUpload) {
                        return value;
                    }
                    var notUploaded = this.getNotUploadedItems().length;
                    var uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
                    var ratio = 100 / this.queue.length;
                    var current = value * ratio / 100;
                    return Math.round(uploaded * ratio + current);
                };
                return FileUploader;
            }());
            exports_1("FileUploader", FileUploader);
        }
    }
});
//# sourceMappingURL=file-uploader.js.map