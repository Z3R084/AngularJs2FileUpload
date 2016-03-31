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
                FileUploader.prototype._xhrTransport = function (file) {
                    var xhr = file._xhr = new XMLHttpRequest();
                    var form = new FormData();
                    form.append(file.alias, file._file, file._file.name);
                    xhr.open(file.method, file.url, true);
                    xhr.send(form);
                };
                return FileUploader;
            }());
            exports_1("FileUploader", FileUploader);
        }
    }
});
//# sourceMappingURL=file-uploader.js.map