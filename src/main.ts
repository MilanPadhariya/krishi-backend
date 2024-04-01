import {log} from '@log';
import {ObjRepos} from '@models';
import fs from 'fs';
import {Db} from './db';
import {environment} from './environment/environment';
import {WebServer} from './web-server';

process.on('exit',()=>{
	fs.unlinkSync('pid.txt');
	process.exit(0);
});

export async function main(){
	if(environment.local){
		log.info('running locally');
		log.includeStack=true;
	}
	log.info('starting pid',process.pid);
	fs.writeFileSync('pid.txt',process.pid.toString());

	log.info('environment type',environment.environmentType);
	const webServer=new WebServer();

	let db:Db;
	try{
		db=new Db(environment.db());
		await db.testConnect();
		log.info(`connected to db ${environment.db().database}`);
	}catch(e){
		db=null;
		log.error('failed to connect to db:',e)
	}

	if(db && environment.environmentType==='cloud'){
		await db.runMigration(log,'assets/db-migrations');
	}

	let objRepos:ObjRepos=null;
	if(db){
		objRepos=new ObjRepos(db);
		const schemaValidated=await objRepos.validateSchema();
		if(!schemaValidated)
			objRepos=null;
	}

	try{
		webServer.initRoutes(db,objRepos);
	}catch(e){
		console.error(e);
	}

	const port=environment.port();
	if(port)
		webServer.listen(environment.port());
}

