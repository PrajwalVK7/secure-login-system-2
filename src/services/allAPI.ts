import { baseURL } from "./baseURL"
import { commonAPI } from "./commonAPI"





// register user API
export const registerUserAPI = async(reqBody:any)=>{

    return await commonAPI("POST",`${baseURL}/user/register`,reqBody,"")
}

//login API

export const loginAPI = async(reqBody:any)=>{
    return await commonAPI("POST",`${baseURL}/user/login`,reqBody,"")
}