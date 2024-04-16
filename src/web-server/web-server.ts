import { environment } from '@environment';
import { WebServer as _WebServer } from '@lib/web-server';
import { log } from '@log';
import { Db } from '../db';
import { ObjRepos } from '../models/general/obj-repos';
import { RouteUpGet,RouteUpPost } from './routes-up';
import { User } from '../models/user';
import { RouteUserLogin,RouteUserLogout,RouteUserMe } from './routes-user-login';
import { Tool } from '../models/tool';

export class WebServer extends _WebServer{
	public constructor(){
		super(log);
	}

	public initRoutes(db:Db, objRepos:ObjRepos){
		this.restRoute(new RouteUpGet(db,objRepos,'/up'));
		this.restRoute(new RouteUpPost(db,objRepos));
		this.restRoute(new RouteUserLogin(objRepos));
		this.restRoute(new RouteUserLogout(objRepos));
		this.restRoute(new RouteUserMe(objRepos));

		if(objRepos){
			this.modelRoute(new User.RestController(objRepos.user));
			this.modelRoute(new Tool.RestController(objRepos.tool,objRepos.user));
		}else{
			this.restRoute(new RouteUpGet(db,objRepos,'/'));
		}
	}
	
}
