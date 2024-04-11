import {char} from "../../lib/model-meta";

export class UserLoginBody{
	public email!:string;
	public password!:string;
}

export class UserLogoutBody{
	public email!:string;
	public authToken!:char<32>;
}

export class UserLogoutResponse{
	public success:boolean;
}

export class UserMeBody{
	public email!:string;
	public authToken!:char<32>;
}
