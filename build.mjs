import {execSync,spawnSync} from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import {fileURLToPath} from 'url';
import {CliArgs} from './lib/cli-args.mjs';
import {tsconfigPathsConvert} from './lib/tsconfig-paths/convert-paths.mjs';
import {tsconfigRead} from './lib/tsconfig-read.mjs';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const args=new CliArgs(__filename);
const tsconfig=tsconfigRead();

function stdout(...args){
	console.info(...args);
}

function generateMeta(){
	stdout("building model meta");
	const cwd=process.cwd();
	process.chdir('./');
	execSync('npm run build-meta',{stdio:'inherit'});
	process.chdir(cwd);	
}

function main(){
	if(args.flags.has('tsconfig')){
		stdout(tsconfig);
		stdout(tsconfig.options.paths);
		return;
	}
	if(args.flags.has('run'))
		generateMeta();

	let rootDir=tsconfig.options.rootDir;
	let outDir=tsconfig.options.outDir;
	let projDir=tsconfig.options['pathsBasePath'];

	if(!rootDir){
		stdout('no rootDir on tsconfig');
		return;
	}
	if(!outDir){
		stdout('no outDir on tsconfig');
		return;
	}
	if(typeof(projDir)!=='string'){
		stdout('no pathsBasePath on tsconfig');
		return;
	}
	
	const outProjDir=path.relative(rootDir,projDir);
	const runDir=path.join(outDir,outProjDir);
	stdout('root dir:',rootDir);
	stdout('project dir:',projDir);
	stdout('out dir:',outDir);
	stdout('run dir:',runDir);

	if(fs.existsSync(outDir)){
		stdout('clearing out dir');
		const filenames=fs.readdirSync(outDir)
			.map(fn=>path.join(outDir,fn));
		for(const fn of filenames){
			fs.rmSync(fn,{recursive:true,force:true});
		}
	}

	stdout('copying assets');
	fs.copySync(path.join(projDir,'assets'),path.join(runDir,'assets'));

	if(args.flags.has('run')){
		if(args.flags.has('watch')){
			stdout('compiling and watching');
			spawnSync(`npx tsc-watch --onSuccess "node ./lib/tsconfig-paths/convert-paths-cli.mjs ${runDir}"`,{shell:true,stdio:'inherit'});
		}else{
			stdout('compiling');
			spawnSync(`npx tsc`,{shell:true,stdio:'inherit'});
			stdout('converting paths')
			tsconfigPathsConvert(tsconfig,runDir);
			stdout('running');
			process.chdir(runDir);
			spawnSync(`node ${runDir}/index.js`,{shell:true,stdio:'inherit'});
		}
	}else{
		stdout('compiling');
		spawnSync(`npx tsc`,{shell:true,stdio:'inherit'});
		stdout('converting paths')
		tsconfigPathsConvert(tsconfig,runDir);
	
		let packageJson=JSON.parse(fs.readFileSync(path.join(__dirname,'./package.json'),'ascii'));
		packageJson={
			name: 'krishi',
			scripts:{
				"start": 'node ./index.js',
			},
			dependencies: packageJson.dependencies,
		};
		fs.writeFileSync(path.join(outDir,'package.json'),JSON.stringify(packageJson,undefined,'\t'));
		fs.copyFileSync(path.join(__dirname,'../package-lock.json'),path.join(outDir,'package-lock.json'));
	}

	stdout('finished');
}

main();
