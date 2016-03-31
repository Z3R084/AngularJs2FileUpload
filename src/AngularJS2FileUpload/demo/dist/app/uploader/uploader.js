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
                    this.files = [];
                }
                QdtUploader.prototype.ngOnInit = function () {
                    this.fileUploader = new file_uploader_1.FileUploader({ url: this.url });
                };
                QdtUploader.prototype.changeEvent = function ($event) {
                    this.fileUploader.addToQueue($event.target.files);
                    //console.log( $event.target.files );
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], QdtUploader.prototype, "url", void 0);
                QdtUploader = __decorate([
                    core_1.Component({
                        selector: 'qdt-uploader',
                        styles: ["\n\t\t.uploader {\n\t\t\twidth: 90%;\n\t\t\tmargin: 1em;\n\t\t\tborder-collapse: separate;\n\t\t\tborder-spacing: 0 6px;\n\t\t}\n\t\t.uploader tr {\n\t\t\tcursor: pointer;\n\t\t}\n\t\t.uploader tr:hover td {\n\t\t\tbackground-color: #DDD;\n\t\t\tcolor: #607D8B;\n\t\t}\n\t\t.uploader tr td {\n\t\t\tbackground-color: #EEE;\t\t\t\t\n\t\t\tpadding: .5em;\n\t\t}\n\t\t.uploader tr td:first-child {\n\t\t\tborder-radius: 5px 0 0 5px;\n\t\t}\n\t\t.uploader tr td:last-child {\n\t\t\tborder-radius: 0 5px 5px 0;\n\t\t}\n\t"],
                        template: "\n\t\t<div><input type=\"file\" id=\"fileUpload\" multiple class=\"btn btn-default\" (change)=\"changeEvent( $event )\" /></div>\n\t\t<table class=\"uploader\">\n\t\t\t<tr *ngFor=\"#file of fileUploader.queue\">\n\t\t\t\t<td>{{ file._file.name }}</td>\n\t\t\t\t<td>{{ file._file.humanSize }}</td>\n\t\t\t\t<td>\n\t\t\t\t\t<div class=\"progress\" style=\"margin-bottom: 0; width: 200px;\">\n\t\t\t\t\t\t<div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<button class=\"btn btn-primary btn-xs\" (click)=\"file.upload()\"><span class=\"glyphicon glyphicon-upload\"></span> Upload</button>&nbsp;\n\t\t\t\t\t<button class=\"btn btn-danger btn-xs\" (click)=\"file.remove()\"><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\t"
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