import {DateTime,char,inet,int,rest,serial,uniqueKey,varchar} from "../../lib/model-meta";

export class User{
	public static readonly route='user';

	public id!:serial;
	@uniqueKey public email!:varchar<128>;
	@rest.secret public encryptedPassword!:char<60>;
	@uniqueKey @rest.readonly public authToken:char<32>=null;
	public permissions=0;
	public firstName!:varchar<128>;
	public lastName!:varchar<128>;
	@rest.readonly public createdAt=new DateTime();
	@rest.readonly public lastSignInAt:Date=null;
	@rest.readonly public lastSignInIp:inet=null;

	//not a real field in the db used for setting the password
	@rest.writeonly public password:string;
}
