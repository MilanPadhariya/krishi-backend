import {environment} from "@environment";
import {sql} from "@lib/database/sql";
import {ObjRepo} from "@lib/object-repository";
import {log} from "@log";
import {User} from "../user";
import { Tool } from "../tool";
import { RentalSession } from "../rental-session";

export class ObjRepos{
	public constructor(
		public readonly db:sql.Db,
	){
	}

	public readonly user=new User.Repo(this.db);
	public readonly tool=new Tool.Repo(this.db);
	public readonly rentalSession=new RentalSession.Repo(this.db,this.tool,this.user);

	public async validateSchema(){
		const repos=[
			this.user,
			this.tool,
			this.rentalSession
		];

		const allowAlter=(environment.environmentType==='cloud');

		if(allowAlter){
			for(const repo of repos)
				await repo.createTable();
		}

		let validatedTables=true;
		for(const repo of repos){
			try{
				await repo.validateTable({
					log,
					addMissingColumns: allowAlter,
					alterColumns: allowAlter,
				});
			}catch(e:any){
				if(e instanceof ObjRepo.ValidationError){
					validatedTables=false;
					log.error(`error in table schema ${repo.meta.name} ${e.message ?? e}`);
					return false;
				}
				throw e;
			}
		}
		if(!validatedTables)
			return false;

			

		return true;
	}
}
