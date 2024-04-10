//model-meta generated file
import {DateTime,ModelMeta,uuid} from '../../lib/model-meta';
import {WhereTable,RestTypes as _RestTypes} from '../../lib/model-meta';

export class User{
	public id:number;
	public email:string;
	public encryptedPassword:string;
	public authToken:string=null;
	public permissions:number=0;
	public firstName:string;
	public lastName:string;
	public createdAt:DateTime=new DateTime();
	public lastSignInAt:DateTime=null;
	public lastSignInIp:string=null;
	public password:string;
}

export namespace User{
	export const meta=new ModelMeta<keyof Props>(
		"User",
		[],
		[
			{
				name: "id",
				type: "serial",
				decorators: {},
				uniqueKey: true,
				notNull: true
			},{
				name: "email",
				type: "string",
				typeLength: [0,128],
				decorators: {
					uniqueKey: true
				},
				uniqueKey: true,
				notNull: true
			},{
				name: "encryptedPassword",
				type: "string",
				typeLength: [60,60],
				decorators: {
					"rest.secret": true
				},
				notNull: true
			},{
				name: "authToken",
				type: "string",
				typeLength: [32,32],
				decorators: {
					uniqueKey: true,
					"rest.readonly": true
				},
				uniqueKey: true,
				default: null,
				optional: true
			},{
				name: "permissions",
				type: "int",
				decorators: {},
				default: 0,
				optional: true,
				notNull: true
			},{
				name: "firstName",
				type: "string",
				typeLength: [0,128],
				decorators: {},
				notNull: true
			},{
				name: "lastName",
				type: "string",
				typeLength: [0,128],
				decorators: {},
				notNull: true
			},{
				name: "createdAt",
				type: "date",
				decorators: {
					"rest.readonly": true
				},
				default: "now()",
				optional: true,
				notNull: true
			},{
				name: "lastSignInAt",
				type: "date",
				decorators: {
					"rest.readonly": true
				},
				default: null,
				optional: true
			},{
				name: "lastSignInIp",
				type: "inet",
				decorators: {
					"rest.readonly": true
				},
				default: null,
				optional: true
			},{
				name: "password",
				type: "string",
				decorators: {
					"rest.writeonly": true
				},
				notNull: true,
				comment: "not a real field in the db used for setting the password"
			}
		]
	);

	export interface Props{
		id:number;
		email:string;
		encryptedPassword:string;
		authToken?:string;
		permissions?:number;
		firstName:string;
		lastName:string;
		createdAt?:DateTime;
		lastSignInAt?:DateTime;
		lastSignInIp?:string;
		password:string;
	}

	export interface UniqueKeyProps{
		id:number;
		email:string;
		authToken?:string;
	}

	export interface PrimitiveProps{
		id:number;
		email:string;
		encryptedPassword:string;
		authToken?:string;
		permissions?:number;
		firstName:string;
		lastName:string;
		createdAt?:DateTime;
		lastSignInAt?:DateTime;
		lastSignInIp?:string;
		password:string;
	}


	meta.generateRest("user",[
		{
			name: "email",
			type: "string",
			decorators: {}
		},{
			name: "authToken",
			type: "string",
			decorators: {}
		}
	]);

	export interface ReadableProps{
		id:number;
		email:string;
		authToken?:string;
		permissions?:number;
		firstName:string;
		lastName:string;
		createdAt?:DateTime;
		lastSignInAt?:DateTime;
		lastSignInIp?:string;
	}

	export interface ReadablePrimitiveProps{
		id:number;
		email:string;
		authToken?:string;
		permissions?:number;
		firstName:string;
		lastName:string;
		createdAt?:DateTime;
		lastSignInAt?:DateTime;
		lastSignInIp?:string;
	}

	namespace body{

		interface WritableProps{
			email:string;
			permissions?:number;
			firstName:string;
			lastName:string;
			password:string;
		}

		export interface Auth{
			email?:string;
			authToken?:string;
		}

		export interface Get extends Auth{
			where:number;
			fields?:(keyof ReadableProps)[];
		}

		export interface Put extends Auth{
			where:number;
			fields:Partial<WritableProps>;
		}

		export interface Post extends Auth{
			fields:Partial<WritableProps>;
		}

		export interface Delete extends Auth{
			where:number;
		}

		export interface Count extends Auth{
			where?:WhereTable<keyof ReadablePrimitiveProps>;
		}

		export interface Search extends Auth{
			fields?:(keyof ReadablePrimitiveProps)[];
			where?:WhereTable<keyof ReadablePrimitiveProps>;
			range?:[number,number];
			sort?:Partial<Record<keyof ReadablePrimitiveProps,'+'|'-'>>;
		}
	}

	namespace _response{
		export type Get=Partial<ReadableProps>;
		export type Search=Partial<ReadablePrimitiveProps>[];
	}

	export interface RestTypes extends _RestTypes{
		body:{
			Auth:body.Auth;
			Get:body.Get;
			Put:body.Put;
			Post:body.Post;
			Delete:body.Delete;
			Count:body.Count;
			Search:body.Search;
		}

		response: {
			Get:_response.Get;
			Search:_response.Search;
		}
	}

}
