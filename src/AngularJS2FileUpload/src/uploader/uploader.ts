import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {FileUploader} from './file-uploader';

@Component({
	selector: 'qdt-uploader',
	template: '<div><input type="file" id="fileUpload" multiple class="btn btn-default" [uploader]="uploader" /></div>' +
	'<div *ngFor="#file in uploader.queue" style="margin-top: 20px; border-bottom-color: antiquewhite; border-bottom-style: double;">' +
	'<div><span>{{ file.name }}</span></div>' +
	'</div>'
})

export class QdtUploader {

}