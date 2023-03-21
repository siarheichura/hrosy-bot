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
    const hash = this.httpService.hash

    if (hash) {
      newReq = req.clone({ headers: req.headers.set('hash', hash) })
    }

    return next.handle(newReq)
  }
}
