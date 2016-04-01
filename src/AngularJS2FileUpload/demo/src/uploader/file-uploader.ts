import {FileItem} from './file-item';

export class FileUploader {
	public queue: Array<any> = [];
	public filters: Array<any> = [];
	public url: string = '/';
	public removeAfterUpload: boolean = false;
	public progress: number = 0;

	constructor(public options?: any) {
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
		//let index = this.queue.indexOf(file);
		this._xhrTransport(file);
	}

	public getNotUploadedItems() {
		return this.queue.filter(item => !item.isUploaded);
	}

	public onProgressItem(fileItem: FileItem, progress: any) {
	}

	public onProgressAll(progress: any) {
	}

	private _xhrTransport(file: FileItem): void {
		let xhr = file._xhr = new XMLHttpRequest();
		let form = new FormData();
		form.append(file.alias, file._file, file._file.name);
		xhr.upload.onprogress = (event) => {
			let progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
			this._onProgressItem(file, progress);
		}
		xhr.upload.onload = () => {
			console.log('finished');
			this._onCompleteItem(file, xhr.status);
		}
		xhr.onerror = (event) => {
			console.log(event.target);
		}
		xhr.open(file.method, file.url, true);
		xhr.send(form);
	}

	private _onProgressItem(item: FileItem, progress: any) {
		let total = this._getTotalProgress(progress);
		this.progress = total;
		item.onProgress(progress);
		console.log('Progress: ' + progress);
		this.onProgressItem(item, progress);
		this.onProgressAll(total);
	}

	private _onCompleteItem(file: FileItem, status: any) {
		file.onProgress(100);
		console.log('file finished');
	}

	private _getTotalProgress(value: number = 0): number {
		if (this.removeAfterUpload) {
			return value;
		}
		let notUploaded = this.getNotUploadedItems().length;
		let uploaded = notUploaded ? this.queue.length - notUploaded : this.queue.length;
		let ratio = 100 / this.queue.length;
		let current = value * ratio / 100;
		return Math.round(uploaded * ratio + current);
	}
}