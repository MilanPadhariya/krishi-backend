import {ModelMeta,RestTypes as _RestTypes} from '@lib/model-meta';
import {ObjRepo} from '@lib/object-repository';
import {WebServer} from '@lib/web-server';
import {WhereTable} from '@lib/where';
import {User} from './user';

type Request<Body>=WebServer.Request<User,Body>;
type _Request<Body>=Request<Body>;

export class RestController<
	Instance extends {id:number},
	RestTypes extends _RestTypes,
> extends WebServer.RestController<
	User,
	Instance,
	RestTypes
>{
	public constructor(
		instanceType:{
			meta:ModelMeta;
			new ():Instance;
		},
		protected readonly objRepo:ObjRepo<Instance>,
		protected readonly userRepo:User.Repo,
		protected readonly permissions:number,
	){
		super(instanceType);
	}

	public isAuthorized(auth:RestTypes['body']['Auth']):Promise<null>{
		return null;
	}

	protected adjustWhere(
		req:Request<any>,
		where:WhereTable
	){
		return where;
	}
	
	protected async adjustInstance(
		req:Request<any>,
		instance:Instance,
	){
		return instance;
	}
	
	protected async getWhere(
		req:Request<any>,
		where:WhereTable,
		fields:Iterable<string>,
	){
		where=this.adjustWhere(req,where);
		const instance=await this.objRepo.get(where);
		if(!instance)
			return null;
		const out:RestTypes['response']['Get']={};
		fields??=this.meta.rest.get.fields;
		for(const field of fields)
			(<Record<string,any>>out)[field]=(<Record<string,any>>instance)[field];
		return out;
	}

	public async get(req:Request<RestTypes['body']['Get']>):Promise<RestTypes['response']['Get']>{
		return this.getWhere(req,{id:req.body.where},req.body.fields);
	}

	public async put(req:Request<RestTypes['body']['Put']>):Promise<boolean>{
		const where=this.adjustWhere(req,{id:req.body.where});
		let instance=await this.objRepo.get(where);
		if(!instance)
			return false;
		for(const field in req.body.fields)
			(<Record<string,any>>instance)[field]=(<Record<string,any>>req.body.fields)[field];
		instance=await this.adjustInstance(req,instance);
		if(!instance)
			return false;
		const r=await this.objRepo.put(where,instance);
		return r>0;
	}

	public async post(req:Request<RestTypes['body']['Post']>):Promise<number>{
		let instance=new this.instanceType();
		for(const field in req.body.fields)
			(<Record<string,any>>instance)[field]=(<Record<string,any>>req.body.fields)[field];
		instance=await this.adjustInstance(req,instance);
		if(!instance)
			return null;
		return this.objRepo.post(instance);
	}

	public async delete(req:Request<RestTypes['body']['Delete']>): Promise<boolean>{
		const where=this.adjustWhere(req,{id:req.body.where});
		const r=await this.objRepo.delete(where);
		return r>0;
	}

	public count(req:Request<RestTypes['body']['Count']>):Promise<number>{
		const where=this.adjustWhere(req,req.body.where);
		return this.objRepo.count(where);
	}

	public search(req:Request<RestTypes['body']['Search']>):Promise<RestTypes['response']['Search']>{
		const where=this.adjustWhere(req,req.body.where);
		return this.objRepo.search(
			where,
			req.body.sort,
			req.body.range?.[0],
			req.body.range?.[1],
		);
	}
}

export namespace RestController{
	export type Request<Body>=_Request<Body>;
}
