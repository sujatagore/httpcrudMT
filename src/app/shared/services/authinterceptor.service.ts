import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor(
    private _loaderService : LoaderService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this._loaderService.loaderStatus$.next(true)
     const token = `JWT Get Token Form LS`;
     
     const reqClone = req.clone({
        setHeaders: {
          "content-Type" : 'Application/json',
          "Token" : token
        }
     })

     return next.handle(reqClone)
              .pipe(
                finalize(() =>{
                  this._loaderService.loaderStatus$.next(false)
                })
              )
  }
}
