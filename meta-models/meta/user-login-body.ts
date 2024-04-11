//model-meta generated file
import {DateTime,ModelMeta,uuid} from '../../lib/model-meta';

export class UserLoginBody{
	public email:string;
	public password:string;
}

export namespace UserLoginBody{
	export const meta=new ModelMeta<keyof Props>(
		"UserLoginBody",
		[],
		[
			{
				name: "email",
				type: "string",
				decorators: {},
				notNull: true
			},{
				name: "password",
				type: "string",
				decorators: {},
				notNull: true
			}
		]
	);

	export interface Props{
		email:string;
		password:string;
	}

	export interface PrimitiveProps{
		email:string;
		password:string;
	}

}
