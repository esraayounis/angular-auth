import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { TokenApiModel } from '../models/token-api/token-api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = "https://api.escuelajs.co/api/v1/";
  private userPayload:any;

  constructor(private http:HttpClient, private router:Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj:any){
    console.log(`${this.baseUrl}users`)
    return this.http.post<any>(`${this.baseUrl}users/`, userObj)
  }

  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}auth/login`, loginObj)
  }

  signOut(){
    localStorage.clear();
    this.router.navigate(['login'])
  }
   
  storeToken(token :string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  storeRefreshToken(token: string){
    localStorage.setItem('refreshToken', token)
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }


  getAllUsers(){
    return this.http.get<any>(`${this.baseUrl}users`);
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  renewToken(tokenApi : TokenApiModel){
    return this.http.post<any>(`${this.baseUrl}auth/refresh-token`, tokenApi)
  }
}
