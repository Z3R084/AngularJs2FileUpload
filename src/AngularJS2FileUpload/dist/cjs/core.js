System.register(['./uploader/uploader'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var uploader_1;
    var NGB_DIRECTIVES;
    return {
        setters:[
            function (uploader_1_1) {
                uploader_1 = uploader_1_1;
                exports_1({
                    "QdtUploader": uploader_1_1["QdtUploader"]
                });
            }],
        execute: function() {
            exports_1("NGB_DIRECTIVES", NGB_DIRECTIVES = [uploader_1.QdtUploader]);
        }
    }
});
