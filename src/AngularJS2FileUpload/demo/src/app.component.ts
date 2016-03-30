import {Component} from 'angular2/core';
import {QdtUploader} from './uploader/uploader';

@Component( {
	selector: 'my-app',
	directives: [QdtUploader],
	template: `
		<h1>Nur ein Test</h1>
		<qdt-uploader></qdt-uploader>
	`
})

export class AppComponent { }