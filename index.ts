// import '@lib/stdext';
import { main } from "./src/main";
import {log} from '@log';

process.on('uncaughtException',function(e){
	log.error('uncaughtException',e);
});
process.on('unhandledRejection',function(e){
	log.error('unhandledRejection',e);
});

process.chdir(__dirname);
if(__dirname===process.cwd()){
	log.info('set working directory to',__dirname);
	main();
}else{
	log.info('failed to set working directory to',__dirname);
}
