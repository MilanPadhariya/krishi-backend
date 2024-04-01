import {environment} from "@environment";
import {sql} from "@lib/database/sql";
// import {sqlite} from "@lib/database/sql/sqlite";
import {ObjRepo} from "@lib/object-repository";
import {log} from "@log";
import {Client} from "./client";
import {DataInterval} from "./data-interval";
import {DataIntervalTag} from "./data-interval-tag";
import {Device} from "./device";
import {RockCount} from "./rock-count";
import {User} from "./user";
// import {LocalDataInterval} from "./local-data-interval";
// import {LocalRockCount} from "../../../shared-models/private/local-rock-count";

export class ObjRepos{
	public constructor(
		public readonly db:sql.Db,
	){
	}

	public readonly client=new ObjRepo(Client,this.db);
	public readonly device=new ObjRepo(Device,this.db);
	public readonly rockCount=new RockCount.Repo(this.db);
	public readonly user=new User.Repo(this.db);
	public readonly devicerepo=new Device.Repo(this.db);
	public readonly dataInterval=new DataInterval.Repo(this.db,this.rockCount);
	public readonly dataIntervalTag=new DataIntervalTag.Repo(this.db,this.dataInterval);

	// public localDb:sqlite.Db;
	// public localDataInterval:ObjRepo<LocalDataInterval>;
	// public localRockCount:ObjRepo<LocalRockCount>;

	public async validateSchema(){
		const repos=[
			this.client,
			this.device,
			this.dataInterval,
			this.dataIntervalTag,
			this.rockCount,
			this.user,
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

		if(allowAlter){
			const strayosClient=await this.ensureStayosClient();
			await this.ensureAdmin(strayosClient);
			await this.ensureStrayosDevices(strayosClient);
		}

		// this.localDb=await sqlite.Db.open(environment.localDbFilename);
		// this.localDataInterval=new ObjRepo(LocalDataInterval,this.localDb);
		// this.localRockCount=new ObjRepo(LocalRockCount,this.localDb);
		// await this.localDataInterval.createTable();
		// await this.localDataInterval.validateTable();
		// await this.localRockCount.createTable();
		// await this.localRockCount.validateTable();
		return true;
	}

	private async ensureStayosClient(){
		const name='Strayos';
		let client=await this.client.get({name});
		if(!client){
			client=new Client();
			client.name=name;
			this.client.save(client);
		}
		return client;
	}

	private async ensureAdmin(strayosClient:Client){
		if(environment.adminUserPassword){
			const adminEmail='admin@strayos.com';
			let user=await this.user.get({email:adminEmail});
			if(user){
				if(environment.adminUserPassword)
					user.encryptedPassword=User.hashPassword(environment.adminUserPassword);
			}else{
				user=new User();
				user.email='admin@strayos.com';
				user.encryptedPassword=User.hashPassword(environment.adminUserPassword ?? 'password');
			}
			user.clientId=strayosClient.id;
			user.permissions=2;
			await this.user.save(user);
		}
	}

	private async ensureDevice(
		strayosClient:Client,
		uuid:string,
		name:string,
		type:Device['type'],
	){
		let device=await this.device.get({clientId:strayosClient.id,uuid});
		if(!device){
			device=new Device();
			device.clientId=strayosClient.id;
			device.uuid=uuid;
			device.name=name;
			device.type=type;
		}else if(device.name!==name || device.type!==type){
			device.name=name;
			device.type=type;
			this.device.save(device);
		}
		await this.device.save(device);
	}

	private async ensureStrayosDevices(strayosClient:Client){
		await this.ensureDevice(strayosClient,environment.fakeConveyorMonitorUuid,'Strayos Testing Conveyor Belt Monitor','conveyor');
		await this.ensureDevice(strayosClient,environment.fakeTruckMonitorUuid,'Strayos Testing Truck Monitor','truck');
	}
}
