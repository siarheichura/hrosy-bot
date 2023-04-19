import { Injectable } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http'
import { Observable } from 'rxjs'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private httpService: HttpService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req
    const user = this.httpService.user

    if (user) {
      newReq = req.clone({
        headers: req.headers
          .set('Content-Type', 'application/json')
          .set('hash', user.hash)
          .set('id', user.id.toString())
      })
    }

    return next.handle(newReq)
  }
}
