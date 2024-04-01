import fs from 'fs';
import path from 'path';
import {environment} from '@lib/environment';

class StorageLocal{
	public constructor(){
		let fn=environment.get('STORAGE_LOCAL');
		this.filename=fn?path.resolve(fn.toString()):null;
		if(this.filename && fs.existsSync(this.filename)){
			const contents=fs.readFileSync(this.filename,'ascii');
			const table=JSON.parse(contents);
			this.table=Object.fromEntries(Object.entries(table).map(([key,val])=>[key,JSON.stringify(val)]));
		}
	}

	private readonly filename:string|null;
	private readonly keyPrefix='';
	private table:Record<string,string>={};

	private save(){
		if(this.filename){
			const table=Object.fromEntries(Object.entries(this.table).map(([key,val])=>[key,JSON.parse(val)]));
			fs.writeFileSync(this.filename,JSON.stringify(table,undefined,'\t'));
		}
	}

	public get(key:string){
		key=this.keyPrefix+key;
		if(!(key in this.table))
			return null;
		return JSON.parse(this.table[key]);
	}

	public set(key:string,value:any){
		key=this.keyPrefix+key;
		this.table[key]=JSON.stringify(value);
		this.save();
	}

	public delete(key:string){
		key=this.keyPrefix+key;
		if(key in this.table){
			delete this.table[key];
			this.save();
		}
	}

	public clear(){
		this.table={};
		this.save();
	}
}

export const storageLocal=new StorageLocal();
