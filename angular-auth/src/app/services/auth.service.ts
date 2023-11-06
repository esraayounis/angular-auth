import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = "https://localhost:4200/api/v1/";

  constructor(private http:HttpClient) { 
  }
  //Create a user
  signUp(userObj:any){
     return this.http.post<any>(`${this.baseUrl}users`, userObj)
  }
   // login
  login(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}auth/login`, loginObj)
  }
   
  storeToken(token :string){
    localStorage.setItem("token", token);
  }

  getToken(){
    return localStorage.getItem("token");
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem("token");
  }

  getAllUsers(){
    return this.http.get(`${this.baseUrl}users`+ 'limit=' + 2);
  }
}
