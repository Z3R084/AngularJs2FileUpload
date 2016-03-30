import {FileUploader} from './file-uploader';

export class FileItem {
	public _file: File;
	public alias: string = 'file';
	public method: string = 'POST';
	public _xhr: XMLHttpRequest;
	public url: string = '/';

	constructor(private file: any, private _uploader: FileUploader) {
		this._file = file;
		this._file['humanSize'] = this.getHumanFileSize(this._file.size);
	}

	public upload(): void {
		
	}

	public remove(): void {
		this._uploader.removeFromQueue(this);
	}

	private getHumanFileSize(size: number): string {
		let sizes: Array<String> = ['n/a', 'bytes', 'KiB', 'MiB', 'GiB'];
		let i = Math.floor(Math.log(size) / Math.log(1024));
		return (size / Math.pow(1024, i)).toFixed(i ? 1 : 0) + sizes[isNaN(size) ? 0 : i + 1];
	}
}