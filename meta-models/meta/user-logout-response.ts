//model-meta generated file
import {DateTime,ModelMeta,uuid} from '../../lib/model-meta';

export class UserLogoutResponse{
	public success:boolean;
}

export namespace UserLogoutResponse{
	export const meta=new ModelMeta<keyof Props>(
		"UserLogoutResponse",
		[],
		[
			{
				name: "success",
				type: "boolean",
				decorators: {},
				notNull: true
			}
		]
	);

	export interface Props{
		success:boolean;
	}

	export interface PrimitiveProps{
		success:boolean;
	}

}
