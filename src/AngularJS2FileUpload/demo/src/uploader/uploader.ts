import {Component, Input, OnInit} from 'angular2/core';
import {FileUploader} from './file-uploader';

@Component( {
	selector: 'qdt-uploader',
	styles: [`
		.uploader {
			width: 90%;
			margin: 1em;
			border-collapse: separate;
			border-spacing: 0 6px;
		}
		.uploader tr {
			cursor: pointer;
		}
		.uploader tr:hover td {
			background-color: #DDD;
			color: #607D8B;
		}
		.uploader tr td {
			background-color: #EEE;				
			padding: .5em;
		}
		.uploader tr td:first-child {
			border-radius: 5px 0 0 5px;
		}
		.uploader tr td:last-child {
			border-radius: 0 5px 5px 0;
		}
	`],
	template: `
		<div><input type="file" id="fileUpload" multiple class="btn btn-default" (change)="changeEvent( $event )" /></div>
		<table class="uploader">
			<tr *ngFor="#file of fileUploader.queue">
				<td>{{ file._file.name }}</td>
				<td>{{ file._file.humanSize }}</td>
				<td>
					<div class="progress" style="margin-bottom: 0; width: 200px;">
						<div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': file.progress + '%' }"></div>
					</div>
				</td>
				<td>
					<button class="btn btn-primary btn-xs" (click)="file.upload()"><span class="glyphicon glyphicon-upload"></span> Upload</button>&nbsp;
					<button class="btn btn-danger btn-xs" (click)="file.remove()"><span class="glyphicon glyphicon-trash"></span> Delete</button>
				</td>
			</tr>
			<tr>
				<td colspan="4">
					<div class="progress" style="width: 100%;">
						<div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': fileUploader.progress + '%' }"></div>
					</div>
				</td>
			</tr>
		</table>
	`
})

export class QdtUploader implements OnInit {
	@Input()
	public url: string;
	private fileUploader: FileUploader;
	private files: Array<any> = [];

	ngOnInit() {
		this.fileUploader = new FileUploader({ url: this.url });
	}

	changeEvent($event): void {
		this.fileUploader.addToQueue($event.target.files);
		//console.log( $event.target.files );
	}
}