//model-meta generated file
import {DateTime,ModelMeta,uuid} from '../../lib/model-meta';
import {WhereTable,RestTypes as _RestTypes} from '../../lib/model-meta';

export class RentalSessions{
	public id:number;
	public ownerId:number;
	public tenentId:number;
	public begin:number;
	public end:number;
	public Status:'Requested'|'Booked'=null;
}

export namespace RentalSessions{
	export const meta=new ModelMeta<keyof Props>(
		"RentalSessions",
		[],
		[
			{
				name: "id",
				type: "serial",
				decorators: {},
				uniqueKey: true,
				notNull: true
			},{
				name: "ownerId",
				type: "int",
				decorators: {
					index: true
				},
				index: true,
				notNull: true
			},{
				name: "tenentId",
				type: "int",
				decorators: {},
				notNull: true
			},{
				name: "begin",
				type: "int",
				decorators: {},
				notNull: true
			},{
				name: "end",
				type: "int",
				decorators: {},
				notNull: true
			},{
				name: "Status",
				type: "enum",
				members: [
					"Requested",
					"Booked"
				],
				decorators: {},
				default: null,
				optional: true
			}
		]
	);

	export interface Props{
		id:number;
		ownerId:number;
		tenentId:number;
		begin:number;
		end:number;
		Status?:'Requested'|'Booked';
	}

	export interface UniqueKeyProps{
		id:number;
	}

	export interface PrimitiveProps{
		id:number;
		ownerId:number;
		tenentId:number;
		begin:number;
		end:number;
		Status?:'Requested'|'Booked';
	}


	meta.generateRest("rock-count",[
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
		ownerId:number;
		tenentId:number;
		begin:number;
		end:number;
		Status?:'Requested'|'Booked';
	}

	export interface ReadablePrimitiveProps{
		id:number;
		ownerId:number;
		tenentId:number;
		begin:number;
		end:number;
		Status?:'Requested'|'Booked';
	}

	namespace body{

		interface WritableProps{
			ownerId:number;
			tenentId:number;
			begin:number;
			end:number;
			Status?:'Requested'|'Booked';
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
