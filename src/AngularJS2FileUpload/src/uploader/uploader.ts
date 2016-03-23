import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {FileUploader} from './file-uploader';

@Component( {
	selector: 'qdt-uploader',
	template: '<div><input type="file" id="fileUpload" multiple class="btn btn-default" (change)="changeEvent( $event )" /></div>'
	//'<div *ngFor="#file in files" style="margin-top: 20px; border-bottom-color: antiquewhite; border-bottom-style: double;">' +
	//'<div><span>{{ file.name }}</span></div>' +
	//'</div>'
})

export class QdtUploader {
	files: Array<any> = [];
	changeEvent( $event ): void {
		console.log( $event.target.files );
	}
}