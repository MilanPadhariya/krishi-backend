import {RentalSessions as _RentalSessions} from '../../meta-models/meta/rental-sessions';
import {Tool} from './tool';
import {RestController as _RestController} from './general/rest-controller';
import {User} from './user';
import { ObjRepo } from '@lib/object-repository';
import { sql } from '@lib/database/sql';

export class RentalSession extends _RentalSessions{}

export namespace RentalSession{
	export class Repo extends ObjRepo<RentalSession>{
		public constructor(
			db:sql.Db,
			private readonly toolRepo:Tool.Repo,
            private readonly userRepo:User.Repo
		){
			super(RentalSession,db);
		}
	}

	export class RestController extends _RestController<RentalSession,_RentalSessions.RestTypes>{
		public constructor(
			objRepo:ObjRepo<RentalSession>,
			userRepo:User.Repo,
		){
			super(RentalSession,objRepo,userRepo,0);
		}
	}
}
