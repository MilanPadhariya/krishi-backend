import {ObjRepo} from '@lib/object-repository';
import {WhereTable} from '@lib/where';
import { sql } from '@lib/database/sql';
import {RestController as _RestController} from './general/rest-controller';
import {Tool as _Tool} from '../../meta-models/meta/tool';;
import {User} from './user';

export class Tool extends _Tool{
}

export namespace Tool{
	import RestTypes=_Tool.RestTypes;

	export class RestController extends _RestController<Tool,RestTypes>{
		public constructor(
			objRepo:ObjRepo<Tool>,
			userRepo:User.Repo,
		){
			super(Tool,objRepo,userRepo,0);
		}

		protected adjustWhere(req:_RestController.Request<any>, where:WhereTable):WhereTable{
			if(req.auth.permissions<2){
				where??={};
				where['ownerId']=req.auth.id;
			}
			return super.adjustWhere(req,where);
		}

		protected async adjustInstance(req:_RestController.Request<any>, instance:Tool):Promise<Tool>{
			instance.ownerId??=req.auth.id;
			if(req.auth.permissions<2)
				instance.ownerId=req.auth.id;
			return super.adjustInstance(req,instance);
		}
	}

	export class Repo extends ObjRepo<Tool>{
		public constructor(
			db:sql.Db,
		){
			super(Tool,db);
		}
	}
}