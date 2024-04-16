import {DateTime,char,index,inet,int,rest,serial,uniqueKey,varchar} from "../../lib/model-meta";

export class Tool{
	public static readonly route='tool';

	public id!:serial;
	public type!:varchar<128>;
    @rest.readonly public PurchasedOn:Date=null;
    @index public ownerId!:int;
    public rent!:int;
    public includeDriver!:boolean;
}