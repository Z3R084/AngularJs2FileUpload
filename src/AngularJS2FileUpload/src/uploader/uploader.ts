import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {FileUploader} from './file-uploader';

@Component( {
	selector: 'qdt-uploader',
	template: '<div><input type="file" id="fileUpload" multiple class="btn btn-default" (change)="changeEvent( $event )" /></div>' +
	'<div *ngFor="#file of fileUploader.queue" style="margin-top: 20px; border-bottom-color: antiquewhite; border-bottom-style: double;">' +
	'<div><span>{{ file._file.name }}</span></div><div style="float: right;"><span>{{ file._file.humanSize }}</span></div>' +
	'</div>'
})

export class QdtUploader {
	private fileUploader: FileUploader = new FileUploader();
	private files: Array<any> = [];
	changeEvent($event): void {
		this.fileUploader.addToQueue($event.target.files);
		//console.log( $event.target.files );
	}
}