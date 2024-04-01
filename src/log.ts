interface Log{
	(level:log.Level, ...message:{toString():string}[]):void;
	info(...message:{toString():string}[]):void;
	warn(...message:{toString():string}[]):void;
	error(...message:{toString():string}[]):void;
	includeStack:boolean;
}

export const log=<Log>function(level:log.Level, ...message:{toString():string}[]){
	const extra:string[]=[];
	const _message=message.map(v=>{
		let string='<error>';
		try{
			if(log.includeStack &&  v instanceof Error){
				let stack=v.stack;
				// if(stack?.startsWith(v.message))
				// 	stack=stack.substring(v.message.length);
				extra.push(stack);
				string=v.toString();
			}else if(Array.isArray(v)){
				extra.push(...v.map(item=>item.toString()));
				string='';
			}else
				string=v.toString();
		}catch(e){
		}
		return string;
	}).join(' ');

	console[level](`--${level.padEnd(5,'-')}--`,_message);
	for(const line of extra)
		console[level]('---------',line);

}

log.info=log.bind(undefined,'info');
log.warn=log.bind(undefined,'warn');
log.error=log.bind(undefined,'error');

export namespace log{
	export type Level='info'|'warn'|'error';
}
