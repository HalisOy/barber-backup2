import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserForLoginDto } from "../dtos/user-for-login-dto";
import { Observable } from "rxjs";
import { DataResponse } from "../models/responses";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { User } from "../models/user";
@Injectable({providedIn:'root'})
export class AuthService{
    
    constructor(private httpClient:HttpClient){}

    login(userForLoginDto:UserForLoginDto):Observable<DataResponse<{token:string,user:User}>>{
        return this.httpClient.post<DataResponse<{token:string,user:User}>>(environment.getApiUrl("auth/login"),userForLoginDto)
    }
    isLogin():Observable<boolean>{
        return this.httpClient.post<boolean>(environment.getApiUrl("auth/is-login"),{})
    }
    setAllCredentials():Observable<boolean>{
        return this.httpClient.get<boolean>(environment.getApiUrl("auth/set-all-credentials"))
    }
    logout(){
        localStorage.removeItem("token");
    }
}