import {WebServer} from "@lib/web-server";
import {ObjRepos} from "@models";
import fs from 'fs';
import {Db} from "../db";
import {environment} from "../environment/environment";

export class RouteUpGet implements WebServer.RestRoute<null>{
	public constructor(
		db:Db,
		objRepos:ObjRepos,
		public readonly route:string,
	){
		const startTime=new Date().toISOString();
		this.upPageContent=fs.readFileSync('assets/up-page.html','ascii')
			.replaceAll('${name}',environment.appName)
			.replaceAll('${startTime}',startTime)
			.replaceAll('${db}',(!!db).toString())
			.replaceAll('${schemaValidated}',(!!objRepos).toString());
	}

	// public readonly route='/up';
	public readonly method='get';
	public contentType='text/html';

	public readonly upPageContent:string;

	public async handle(request:WebServer.Request<null,any>){
		return this.upPageContent;
	}
}

export class RouteUpPost implements WebServer.RestRoute<null>{
	public constructor(
		private readonly db:Db,
		private readonly objRepos:ObjRepos
	){
	}

	public readonly route='/up';
	public readonly method='post';

	public async handle(request:WebServer.Request<null,{}>){
		return !!(this.db && this.objRepos);
	}
}
