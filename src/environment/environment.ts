import * as pg from 'pg';
import {environment as args} from "@lib/environment";

export namespace environment{
	export const appName='Krishi Server';
	export const local=!!args.get('LOCAL');
	export const environmentType:'cloud'|'device'=args.get('ENVIRONMENT_TYPE')?.toString()==='device'?'device':'cloud';

	export function port(){
		const val=args.get('port')?.toString();
		const port=parseInt(val,10);

		if(isNaN(port)){
			throw Error('no port');
		}

		if(port>=0){
			return port;
		}

		return null;
	}

	export function db():pg.ClientConfig{
		return {
			host: args.get('POSTGRESQL_HOST')?.toString(),
			port: parseInt(args.get('POSTGRESQL_PORT')?.toString()),
			database: args.get('POSTGRESQL_DATABASE')?.toString(),
			user: args.get('POSTGRESQL_USER')?.toString(),
			password: args.get('POSTGRESQL_PASSWORD')?.toString(),
			ssl: args.get('POSTGRESQL_SSL')==='true' ?? false
		};
	}
	
	export const name=args.get('NAME')?''+args.get('NAME'):null;
}
