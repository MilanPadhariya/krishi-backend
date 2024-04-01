import * as azure from '@azure/storage-blob';
import follow from 'follow-redirects';
import coreHttp from 'http';
import {SubscriptionObserver} from "observable-fns";
import * as path from 'path';
import {Observable} from 'threads/observable';
import {expose} from "threads/worker";
import {environment} from '../environment';

const maxConcurrentTransfers=1;

let blobServiceClient:azure.BlobServiceClient;
let containerClient:azure.ContainerClient;

async function downloadPipe(url:string){
	const parsedUrl=new URL(url);
	let http:(typeof follow.http)|(typeof follow.https);
	const protocol=parsedUrl.protocol.substring(0,parsedUrl.protocol.length-1);
	if(protocol==='http')
		http=follow.http;
	else if(protocol==='https')
		http=follow.https;
	if(!http)
		throw new Error(`unreconized protocol "${parsedUrl.protocol}"`);
	const response=await new Promise<coreHttp.IncomingMessage&follow.FollowResponse>(resolve=>{
		const request=http.get(url,resolve);
		request.once('error',error=>{throw error});
	});
	response.once('error',error=>{throw error});
	return response;
}

async function _pullFiles(
	toDoStack: {
		index: number;
		url: string;
		uploadName: string;
	}[],
	subscriber:SubscriptionObserver<{
		index:number;
		url:string;
		error?:string;
	}>
){
	const workerFunc=async ()=>{
		while(toDoStack.length>0){
			
			const {index,url,uploadName}=toDoStack.shift();
			const blobClient=containerClient.getBlockBlobClient(uploadName);
			try{
				const download=await downloadPipe(url);
				await blobClient.uploadStream(download);
				subscriber.next({index,url});
			}catch(e){
				subscriber.next({index,url,error:''+e});
			}
		}
	}

	const promises:Promise<void>[]=[];
	for(let i=0;i<maxConcurrentTransfers;++i){
		promises.push(workerFunc());
	}
	await Promise.all(promises);
	subscriber.complete();
}

const _module={
	pullFiles(
		id:number,
		urls:string[],
	){
		if(!blobServiceClient)
			blobServiceClient=azure.BlobServiceClient.fromConnectionString(environment.azureStorageConnectionString);
		if(!containerClient)
			containerClient=blobServiceClient.getContainerClient('uploads');

		const toDoStack=urls.map((url,index)=>{
			const filename=path.basename(new URL(url).pathname);
			const uploadName=`${environment.uploadsStorageFolder}/${+id}/${index.toString().padStart(5,'0')}-${filename}`;
			return {index,url,uploadName};
		});

		return new Observable<{index:number,url:string,error?:string}>(subscriber=>{
			_pullFiles(toDoStack,subscriber);
		});
	}
};

export type _CloudStorageThreadModule=typeof _module;
export interface CloudStorageThreadModule extends _CloudStorageThreadModule{
}
expose(_module);
