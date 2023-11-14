import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { TokenApiModel } from '../models/token-api/token-api.model';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private toast: NgToastService, private router: Router) {}
  
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const myToken = this.authService.getToken();

    if(myToken){
      debugger
      httpRequest = httpRequest.clone({
        setHeaders: {Authorization:`Bearer ${myToken}`}  // "Bearer "+myToken
      })
    }

    return next.handle(httpRequest).pipe(
      catchError((err:any)=>{
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
            //this.router.navigate(['login'])
            //handle
            return this.handleUnAuthorizedError(httpRequest,next);
          }
        }
        return throwError(()=> err)
      })
    );
  }

  handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandler){
    let tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = this.authService.getToken()!;
    tokeApiModel.refreshToken = this.authService.getRefreshToken()!;
    return this.authService.renewToken(tokeApiModel)
    .pipe(
      switchMap((data:TokenApiModel)=>{
        this.authService.storeRefreshToken(data.refreshToken);
        this.authService.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: {Authorization:`Bearer ${data.accessToken}`}  // "Bearer "+myToken
        })
        return next.handle(req);
      }),
      catchError((err)=>{
        return throwError(()=>{
          this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
          this.router.navigate(['login'])
        })
      })
    )
  }
}
