import { environment } from '@environment';
import { WebServer as _WebServer } from '@lib/web-server';
import { log } from '@log';
import { Db } from '../db';
import { ObjRepos } from '../models/obj-repos';
import { RouteUpGet,RouteUpPost } from './routes-up';

export class WebServer extends _WebServer{
	public constructor(){
		super(log);
	}

	public initRoutes(db:Db, objRepos:ObjRepos){
		this.restRoute(new RouteUpGet(db,objRepos,'/up'));
		this.restRoute(new RouteUpPost(db,objRepos));
		if(objRepos){
		}else{
			this.restRoute(new RouteUpGet(db,objRepos,'/'));
		}
	}
	
}
