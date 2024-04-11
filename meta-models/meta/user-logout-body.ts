//model-meta generated file
import {DateTime,ModelMeta,uuid} from '../../lib/model-meta';

export class UserLogoutBody{
	public email:string;
	public authToken:string;
}

export namespace UserLogoutBody{
	export const meta=new ModelMeta<keyof Props>(
		"UserLogoutBody",
		[],
		[
			{
				name: "email",
				type: "string",
				decorators: {},
				notNull: true
			},{
				name: "authToken",
				type: "string",
				typeLength: [32,32],
				decorators: {},
				notNull: true
			}
		]
	);

	export interface Props{
		email:string;
		authToken:string;
	}

	export interface PrimitiveProps{
		email:string;
		authToken:string;
	}

}
