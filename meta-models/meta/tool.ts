//model-meta generated file
import {DateTime,ModelMeta,uuid} from '../../lib/model-meta';
import {WhereTable,RestTypes as _RestTypes} from '../../lib/model-meta';

export class Tool{
	public id:number;
	public type:string;
	public PurchasedOn:DateTime=null;
	public ownerId:number;
	public rent:number;
	public includeDriver:boolean;
}

export namespace Tool{
	export const meta=new ModelMeta<keyof Props>(
		"Tool",
		[],
		[
			{
				name: "id",
				type: "serial",
				decorators: {},
				uniqueKey: true,
				notNull: true
			},{
				name: "type",
				type: "string",
				typeLength: [0,128],
				decorators: {},
				notNull: true
			},{
				name: "PurchasedOn",
				type: "date",
				decorators: {
					"rest.readonly": true
				},
				default: null,
				optional: true
			},{
				name: "ownerId",
				type: "int",
				decorators: {
					index: true
				},
				index: true,
				notNull: true
			},{
				name: "rent",
				type: "int",
				decorators: {},
				notNull: true
			},{
				name: "includeDriver",
				type: "boolean",
				decorators: {},
				notNull: true
			}
		]
	);

	export interface Props{
		id:number;
		type:string;
		PurchasedOn?:DateTime;
		ownerId:number;
		rent:number;
		includeDriver:boolean;
	}

	export interface UniqueKeyProps{
		id:number;
	}

	export interface PrimitiveProps{
		id:number;
		type:string;
		PurchasedOn?:DateTime;
		ownerId:number;
		rent:number;
		includeDriver:boolean;
	}


	meta.generateRest("tool",[
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
		type:string;
		PurchasedOn?:DateTime;
		ownerId:number;
		rent:number;
		includeDriver:boolean;
	}

	export interface ReadablePrimitiveProps{
		id:number;
		type:string;
		PurchasedOn?:DateTime;
		ownerId:number;
		rent:number;
		includeDriver:boolean;
	}

	namespace body{

		interface WritableProps{
			type:string;
			ownerId:number;
			rent:number;
			includeDriver:boolean;
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
