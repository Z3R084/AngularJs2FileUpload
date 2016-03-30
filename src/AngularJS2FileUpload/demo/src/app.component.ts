import {Component} from 'angular2/core';
import {QdtUploader} from '../../src/uploader/uploader';

@Component({
	selector: 'my-app',
	template: '<h1>Nur ein Test</h1><qdt-uploader></qdt-uploader>',
	directives: [QdtUploader]
})

export class AppComponent { }