﻿export class FileUploader {
	public queue: Array<any> = [];
	public filters: Array<any> = [];

	public addToQueue(files: any[], options: any, filters: any) {
		let list: any[] = [];
		for (let file of files) {
			list.push(file);
		}

		let addedFileItems: any[] = [];

		list.map(some => {
			addedFileItems.push(some);
			this.queue.push(some);
		});
	}
}