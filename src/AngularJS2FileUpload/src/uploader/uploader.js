System.register(['angular2/core', './file-uploader'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, file_uploader_1;
    var QdtUploader;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (file_uploader_1_1) {
                file_uploader_1 = file_uploader_1_1;
            }],
        execute: function() {
            QdtUploader = (function () {
                function QdtUploader() {
                    this.fileUploader = new file_uploader_1.FileUploader();
                    this.files = [];
                }
                QdtUploader.prototype.changeEvent = function ($event) {
                    this.fileUploader.addToQueue($event.target.files);
                    //console.log( $event.target.files );
                };
                QdtUploader = __decorate([
                    core_1.Component({
                        selector: 'qdt-uploader',
                        template: '<div><input type="file" id="fileUpload" multiple class="btn btn-default" (change)="changeEvent( $event )" /></div>' +
                            '<div *ngFor="#file of fileUploader.queue" style="margin-top: 20px; border-bottom-color: antiquewhite; border-bottom-style: double;">' +
                            '<div><span>{{ file._file.name }}</span></div><div style="float: right;"><span>{{ file._file.humanSize }}</span></div>' +
                            '</div>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], QdtUploader);
                return QdtUploader;
            }());
            exports_1("QdtUploader", QdtUploader);
        }
    }
});
//# sourceMappingURL=uploader.js.map