import * as azure from '@azure/storage-blob';
import {ModuleThread,spawn,Worker} from 'threads';
import {environment} from '../environment';
import {CloudStorageThreadModule} from './cloud-storage-thread';

let blobServiceClient:azure.BlobServiceClient;
let containerClient:azure.ContainerClient;

export class CloudService{
	private thread:ModuleThread<CloudStorageThreadModule>;

	public async pullFiles(
		id:number,
		urls:string[],
		onTransfer:(count:number)=>void
	){
		if(!this.thread)
			this.thread=await spawn<CloudStorageThreadModule>(new Worker("./cloud-storage-thread"));

		const status$=this.thread.pullFiles(id,urls);

		const transferSucceeded:string[]=[];
		const transferFailed:{url:string,error:string}[]=[];
		status$
			.subscribe(({url,error})=>{
				if(!error){
					transferSucceeded.push(url);
					onTransfer(transferSucceeded.length);
				}else{
					transferFailed.push({url,error});
				}
			});
	
		await status$;
		return transferFailed;
	}

	public async listFiles(containerName:string, prefix:string){
		if(!blobServiceClient)
			blobServiceClient=azure.BlobServiceClient.fromConnectionString(environment.azureStorageConnectionString);
		
		containerClient=blobServiceClient.getContainerClient(containerName);
		
		const files:string[] = [];
		for await (const response of containerClient.listBlobsByHierarchy('/', {prefix:prefix})){
			if(response.kind==='blob'){
				files.push(response.name);
			}
		}

		return files;
	}
}

export const cloudService=new CloudService();
