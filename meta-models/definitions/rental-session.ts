import { index,int,serial } from "../../lib/model-meta";

export class RentalSessions{
	public static readonly route='rock-count';

	public id!:serial;
	@index public ownerId!:int;
	public tenentId!:int;
	public begin!:int;
	public end!:int;
	public Status:'Requested'|'Booked'=null;
}