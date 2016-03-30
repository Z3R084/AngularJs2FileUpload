import {FileItem} from './file-item';

export class FileUploader {
	public queue: Array<any> = [];
	public filters: Array<any> = [];
	public url: string;

	constructor(public options: any) {
		this.url = options.url;
		console.log(this.url);
	}

	public addToQueue(files: any[]) { //, options: any, filters: any
		let list: any[] = [];
		for (let file of files) {
			list.push(file);
		}

		let addedFileItems: any[] = [];

		list.map( some => {
			let fileItem = new FileItem( some, this );
			//addedFileItems.push(some);
			this.queue.push( fileItem );
		});
	}

	public removeFromQueue(file: FileItem): void {
		let index = this.queue.indexOf(file);
		this.queue.splice(index, 1);
	}

	public uploadItem(file: FileItem): void {
		let index = this.queue.indexOf(file);
		this._xhrTransport(file);
	}

	private _xhrTransport(file: FileItem): void {
		let xhr = file._xhr = new XMLHttpRequest();
		let form = new FormData();
		form.append(file.alias, file._file, file._file.name);
		xhr.open(file.method, file.url, true);
		xhr.send(form);
	}
}