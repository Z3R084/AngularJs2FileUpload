export class FileItem {
	public _file: File;

	constructor(private file: any) {
		this._file = file;
		this._file['humanSize'] = this.getHumanFileSize(this._file.size);
	}

	private getHumanFileSize(size: number) {
		let sizes: Array<String> = ['n/a', 'bytes', 'KiB', 'MiB', 'GiB'];
		let i = Math.floor(Math.log(size) / Math.log(1024));
		return (size / Math.pow(1024, i)).toFixed(i ? 1 : 0) + sizes[isNaN(size) ? 0 : i + 1];
	}
}