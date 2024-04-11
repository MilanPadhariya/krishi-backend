import {DateTime, WhereTable,uuid} from '@lib/model-meta';
import * as bcrypt from 'bcrypt';
import {User as _User} from '../../meta-models/meta/user';
import { UserLoginBody, UserLogoutBody, UserMeBody } from './index'
import {RestController as _RestController} from './rest-controller';
import {ObjRepo} from '@lib/object-repository';
import {sql} from '@lib/database/sql';

export class User extends _User{
	public regenerateAuthenticationToken(){
		this.authToken=uuid().replace(/-/g,'');
	}
}

export namespace User{
	export import Props=_User.Props;

	export function hashPassword(password:string){
		const salt=bcrypt.genSaltSync();
		return bcrypt.hashSync(password,salt);
	}

	export class Repo extends ObjRepo<User>{
		public constructor(db:sql.Db){
			super(User,db);
		}
	
		public async login(
			args:UserLoginBody,
			ip:string,
		){
			const user=await this.get({email:args.email.toLocaleLowerCase()});
			if(!user)
				return null;
	
			if(!await bcrypt.compare(args.password,user.encryptedPassword))
				return null;
	
			delete user.encryptedPassword;
			user.lastSignInAt=new DateTime();
			user.lastSignInIp=ip;
			user.regenerateAuthenticationToken();
			await this.save(user);
			return user;
		}

		public async getLoggedInUser(
			email:string,
			authToken:string,
		){
			return this.get({email,authToken});
		}
	
		public async logout(
			args:UserLogoutBody,
		){
			const user=await this.getLoggedInUser(args.email,args.authToken);
			if(!user)
				return false;
	
			user.regenerateAuthenticationToken();
			return await this.save(user);
		}
	
		public async isLoggedIn(
			args:{email?:string,authToken?:string},
			permissions:number,
		){
			if(typeof(args.email)!=='string')
				return null;
			if(typeof(args.authToken)!=='string')
				return null;
			const user=await this.getLoggedInUser(args.email,args.authToken);
			delete args.email;
			delete args.authToken;
			if(!user)
				return null;
			if(user.permissions<permissions)
				return null;
			delete user.encryptedPassword;
			return user;
		}
	}
	
	export class RestController extends _RestController<User,_User.RestTypes>{
		public constructor(
			objRepo:Repo,
		){
			super(User,objRepo,objRepo,0);
		}

		protected async adjustInstance(req:_RestController.Request<any>, instance:User):Promise<User>{

			if('password' in instance){
				instance.encryptedPassword=User.hashPassword(instance.password);
				delete instance.password;
			}

			return super.adjustInstance(req,instance);
		}
	}
}
