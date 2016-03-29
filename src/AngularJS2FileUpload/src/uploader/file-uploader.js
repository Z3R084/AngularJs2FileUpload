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
                function FileUploader() {
                    this.queue = [];
                    this.filters = [];
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
                        var fileItem = new file_item_1.FileItem(some);
                        //addedFileItems.push(some);
                        _this.queue.push(fileItem);
                    });
                };
                return FileUploader;
            }());
            exports_1("FileUploader", FileUploader);
        }
    }
});
//# sourceMappingURL=file-uploader.js.map