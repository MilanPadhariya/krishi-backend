// import { ModelMeta } from '@lib/model-meta';
// import { ErrorRtrn } from '../../shared-models';

// export namespace validate{
// 	function validatePropValue(
// 		prop:ModelMeta.Property,
// 		value:any,
// 	){
// 		const errors:string[]=[];
// 		if(value!==undefined){
// 			if(value===null){
// 				if(prop.notNull)
// 					errors.push('null is not allowed');
// 			}else{
// 				ModelMeta.validatePropValue[prop.type](<any>prop,value,errors);
// 			}
// 		}else if(!prop.optional){
// 			errors.push('missing and not optional');
// 		}
// 		if(errors.length>0)
// 			return errors;
// 		return null;
// 	}

// 	function cleanUpField(
// 		obj:Record<string,any>,
// 		prop:ModelMeta.Property,
// 		splitArrays:boolean,
// 	){
// 		let value=obj[prop.name];
// 		if(typeof(value)==='string'){
// 			if(prop.type==='int' || prop.type==='serial'){
// 				const num=parseInt(value);
// 				if(!isNaN(num))
// 					obj[prop.name]=num;
// 			}else if(prop.type==='number'){
// 				const num=parseFloat(value);
// 				if(!isNaN(num))
// 					obj[prop.name]=num;
// 			}else if(splitArrays && prop.type==='array'){
// 				obj[prop.name]=value=value.split(',');
// 			}
// 		}
// 		if(Array.isArray(value) && prop.type==='array'){
// 			const array=value;
// 			for(let i=0;i<array.length;++i){
// 				if(typeof(array[i])==='string'){
// 					if(prop.valueType==='int' || prop.valueType==='serial')
// 						array[i]=parseInt(array[i]);
// 					else if(prop.valueType==='number')
// 						array[i]=parseFloat(array[i]);
// 				}
// 			}
// 		}
// 	}

// 	function fieldsUnknown(
// 		props:ModelMeta.PropertyList,
// 		obj:Record<string,any>,
// 		errors:ErrorRtrn,
// 		extraProps:string[]=[],
// 	){
// 		for(const key in obj){
// 			if(!(props.get(key) || extraProps.includes(key)))
// 				errors.set(key,['unreconized field']);
// 		}
// 	}

// 	function countBody<Rtrn extends {}>(
// 		props:ModelMeta.PropertyList,
// 		obj:Record<string,any>
// 	){

// 		delete obj['_poll'];

// 		const errors=new ErrorRtrn();
// 		fieldsUnknown(props,obj,errors);
// 		for(const prop of props){
// 			if(obj[prop.name]!==undefined){
// 				cleanUpField(obj,prop,true);
// 				errors.set(prop.name,validatePropValue(prop,obj[prop.name]));
// 			}
// 		}

// 		if(errors.count()>0)
// 			throw errors;
// 		return <Rtrn>obj;
// 	}

// 	function deleteBody<Rtrn extends {}>(
// 		props:ModelMeta.PropertyList,
// 		obj:Record<string,any>
// 	){
// 		const errors=new ErrorRtrn();
// 		fieldsUnknown(props,obj,errors);
// 		let keyCount=0;
// 		for(const prop of props){
// 			if(obj[prop.name]!==undefined){
// 				cleanUpField(obj,prop,false);
// 				keyCount+=1;
// 				errors.set(prop.name,validatePropValue(prop,obj[prop.name]));
// 			}
// 		}

// 		if(keyCount===0)
// 			errors.set('*',['no unique key present']);
// 		if(errors.count()>0)
// 			throw errors;
// 		return <Rtrn>obj;
// 	}

// 	function getBody<Rtrn extends {}>(
// 		props:ModelMeta.PropertyList,
// 		obj:Record<string,any>
// 	){
// 		delete obj['_poll'];

// 		const errors=new ErrorRtrn();
// 		fieldsUnknown(props,obj,errors);
// 		for(const prop of props){
// 			if(obj[prop.name]!==undefined){
// 				cleanUpField(obj,prop,true);
// 				errors.set(prop.name,validatePropValue(prop,obj[prop.name]));
// 			}
// 		}

// 		if(errors.count()>0)
// 			throw errors;
// 		return <Rtrn>obj;
// 	}

// 	function postBody<Rtrn extends {}>(
// 		props:ModelMeta.PropertyList,
// 		obj:Record<string,any>
// 	){
// 		const errors=new ErrorRtrn();
// 		fieldsUnknown(props,obj,errors);
// 		for(const prop of props){
// 			if(obj[prop.name]!==undefined){
// 				cleanUpField(obj,prop,false);
// 				errors.set(prop.name,validatePropValue(prop,obj[prop.name]));
// 			}
// 		}

// 		if(errors.count()>0)
// 			throw errors;
// 		return <Rtrn>obj;
// 	}

// 	function putBody<Rtrn extends {}>(
// 		props:ModelMeta.PropertyList,
// 		obj:Record<string,any>
// 	){
// 		const errors=new ErrorRtrn();
// 		fieldsUnknown(props,obj,errors);
// 		let keyCount=0;
// 		for(const prop of props){
// 			if(obj[prop.name]!==undefined){
// 				cleanUpField(obj,prop,false);
// 				if(prop.uniqueKey)
// 					keyCount+=1;
// 				errors.set(prop.name,validatePropValue(prop,obj[prop.name]));
// 			}
// 		}

// 		if(keyCount===0)
// 			errors.set('*',['no unique key present']);
// 		if(errors.count()>0)
// 			throw errors;
// 		return obj;
// 	}

// 	export const body={
// 		count: countBody,
// 		delete: deleteBody,
// 		get: getBody,
// 		post: postBody,
// 		put: putBody,
// 	}
// }
