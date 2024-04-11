import {environment} from "@environment";
import {WebServer} from "@lib/web-server";
import {ErrorRtrn,ObjRepos,User,UserLoginBody,UserLogoutBody,UserMeBody} from "@models";

export class RouteUserLogin implements WebServer.RestRoute<null>{
	public constructor(
		private readonly objRepos:ObjRepos
	){
	}

	public readonly route='/user/login';
	public readonly method='post';

	public async handle(req:WebServer.Request<null,UserLoginBody>):Promise<User.Props>{
		const user=await this.objRepos.user.login(<UserLoginBody>req.body,req.ip);
		if(!user)
			throw new ErrorRtrn(['invalid user name or password']);

		return {
			...User.meta.removeSecrets(user)
		};
	}
}

export class RouteUserLogout implements WebServer.RestRoute<null>{
	public constructor(
		private readonly objRepos:ObjRepos
	){
	}

	public readonly route='/user/logout';
	public readonly method='post';

	public async handle(req:WebServer.Request<null,UserLogoutBody>){
		await this.objRepos.user.logout(<UserLogoutBody>req.body);
		return true;
	}
}

export class RouteUserMe implements WebServer.RestRoute<null>{
	public constructor(
		private readonly objRepos:ObjRepos
	){
	}

	public readonly route='/user/me';
	public readonly method='post';

	public async handle(req:WebServer.Request<null,UserMeBody>):Promise<User.Props>{
		const user=await this.objRepos.user.isLoggedIn(<UserMeBody>req.body,0);
		if(!user)
			return null;
		return {
			...User.meta.removeSecrets(user),
		};
	}
}