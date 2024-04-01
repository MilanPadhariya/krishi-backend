// async function generateFakePhotogrammetryData(db:Db, client:ApiClient){
// 	for(let month=-11;month<=0;month+=1){
// 		const beginDate=new Date();
// 		beginDate.setUTCMonth(beginDate.getUTCMonth()+month);
// 		beginDate.setUTCDate(1);
// 		beginDate.setUTCHours(0);
// 		beginDate.setUTCMinutes(0);
// 		beginDate.setUTCSeconds(0);
// 		beginDate.setUTCMilliseconds(0);
// 		const endDate=new Date(beginDate);
// 		endDate.setUTCMonth(beginDate.getUTCMonth()+1);
// 		const count=await PhotogrammetryRecord.countAll(db,{
// 			createdAt: `(${beginDate.toISOString()},${endDate.toISOString()}]`,
// 		});
// 		const monthLength=endDate.getTime()-beginDate.getTime();

// 		const needed=100-count;
// 		const records:PhotogrammetryRecord[]=[];
// 		for(let i=0;i<needed;++i){
// 			const record=new PhotogrammetryRecord();
// 			record.apiClientId=client.id;
// 			record.imageTransferedCount=record.imageCount=Math.round(50+Math.random()*100);
// 			record.imageUrls=[];
// 			for(let i=0;i<record.imageCount;++i)
// 				record.imageUrls[i]=`https://fakedomain.com/img${i.toFixed(0).padStart(4,'0')}.jpg`;
// 			record.callbackUrl='https://fakedomain.com/callback';
// 			record.createdAt.setTime(beginDate.getTime()+Math.round(Math.random()*monthLength));
			
// 			record.status=Math.random()<0.99?'succeeded':'failed';
// 			if(record.status==='succeeded'){
// 				record.completedAt=new Date(record.createdAt);
// 				record.completedAt.setUTCMinutes(record.createdAt.getUTCMinutes()+Math.round(20+Math.random()*60));
// 				const urlBase=`${environment.outputUrlBase}/output/${environment.uploadsStorageFolder}/output/${record.id}`;
// 				record.orthophotoUrl=`${urlBase}/orthophoto/orthophoto_export.tif`;
// 				record.dsmUrl=`${urlBase}/output/dsm/dsm.tif`;
// 				record.objUrl=`${urlBase}/output/textured/textured_model.zip`;
// 			}else{
// 				console.info('made test record',i,'of',needed,'for month',beginDate.toISOString().substring(0,7));
// 				record.errors=['fake failure'];
// 			}
// 			records.push(record);
// 		}
// 		records.sort((a,b)=>a.createdAt.toISOString().localeCompare(b.createdAt.toISOString()));
// 		for(const record of records)
// 			await record.save(db);

// 		if(needed>0)
// 			console.info('made',needed,'test records for month',beginDate.toISOString().substring(0,7));
// 	}	
// }

// export namespace schema{
// 	export async function initialize(db:Db){
// 		const types=models;
// 		for(const type of types){
// 			await objRepo.createTable(db,type.meta.name,[...type.meta]);
// 		}

// 		let validatedTables=true;
// 		for(const type of types){
// 			if(!await validateTable(db,type.meta))
// 				validatedTables=false;
// 		}
// 		if(!validatedTables)
// 			return false;

// 		const strayosClient=await ensureStayosClient(db);
// 		await ensureAdmin(db,strayosClient);

		// let user=new User();
		// user.apiClientId=strayosClient.id;
		// user.email='john@strayos.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('certainty iron language fortune 1');
		// user.permissions=2;
		// user.save(db);

		// user=new User();
		// user.apiClientId=strayosClient.id;
		// user.email='ravi@strayos.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('popular appearance repeat keep 7');
		// user.permissions=2;
		// user.save(db);

		// user=new User();
		// user.apiClientId=strayosClient.id;
		// user.email='shuo@strayos.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('advantage know since leaf 3');
		// user.permissions=2;
		// user.save(db);

		// user=new User();
		// user.apiClientId=strayosClient.id;
		// user.email='naved@strayos.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('this is a password 11');
		// user.permissions=2;
		// user.save(db);

		// if(environment.local){
		// 	await generateFakePhotogrammetryData(db,strayosClient);
		// }
		
		// let client=new ApiClient();
		// client.apiKey='N87W7KSPF2WJRC0339FS5I3ND94BU17XBBAL0Q6DDOQWD12FDOONGAR2MIAPB8GR';
		// client.id=await ApiClient.getId(db,{apiKey:client.apiKey});
		// client.save(db);

		// user=new User();
		// user.apiClientId=client.id;
		// user.email='pierre.bouffard-vercelli@epc-groupe.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('sew song harm home lake 5');
		// user.permissions=1;
		// user.save(db);
		// user=new User();
		// user.apiClientId=client.id;
		// user.email='ricardo.chavez@epc-groupe.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('hasten often twist lighten 5');
		// user.permissions=1;
		// user.save(db);

		// client=new ApiClient();
		// client.apiKey='CPZQKJOYX805I98XGLQEC7HK9PNL9MPIWC9GZKX5ECV2DWQ25GF5WQ5PFILEMLU1';
		// client.id=await ApiClient.getId(db,{apiKey:client.apiKey});
		// client.save(db);

		// user=new User();
		// user.apiClientId=client.id;
		// user.email='chris.clark@dlti.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('possessor wealth park bowl 6');
		// user.permissions=1;
		// user.save(db);

		// let holcimClient=new ApiClient();
		// holcimClient.apiKey='RDI82HGGR2SZH53OYMIWYVV172K4NJDVY5G8B9FADNKI686EIKF6V7TNVBT2YAQO';
		// holcimClient.id=await ApiClient.getId(db,{apiKey:holcimClient.apiKey});
		// holcimClient.save(db);

		// user=new User();
		// user.apiClientId=holcimClient.id;
		// user.email='anuj.jettley.ext@holcim.com';
		// user.id=await User.getId(db,{email:user.email});
		// user.encryptedPassword=User.hashPassword('man pick plant struggle 1');
		// user.permissions=1;
		// user.save(db);

// 		return true;
// 	}

// }
