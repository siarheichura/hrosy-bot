import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { ICategories, IHttpResponse, IWallets } from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  get hash(): string | null {
    return localStorage.getItem('hash')
  }

  setHashToLocalStorage(hash: string): void {
    if (!hash) {
      localStorage.setItem('hash', hash)
    }
  }

  // categories
  getCategories(): Observable<IHttpResponse<ICategories>> {
    return this.http.get<IHttpResponse<ICategories>>(`${this.apiUrl}categories`)
  }

  updateCategories(
    categories: ICategories
  ): Observable<IHttpResponse<{ message: string }>> {
    return this.http.put<IHttpResponse<{ message: string }>>(
      `${this.apiUrl}categories`,
      {
        ...categories
      }
    )
  }

  // wallets
  getWallets(): Observable<IHttpResponse<IWallets>> {
    return this.http.get<IHttpResponse<IWallets>>(
      `${environment.apiUrl}wallets`
    )
  }

  updateWallet(data: IWallets): Observable<IHttpResponse<{ message: string }>> {
    return this.http.post<IHttpResponse<{ message: string }>>(
      `${environment.apiUrl}wallets`,
      { data }
    )
  }

  // currencies
  getAllCurrencies(): Observable<IHttpResponse<string[]>> {
    return this.http.get<IHttpResponse<string[]>>(
      `${environment.apiUrl}currencies`
    )
  }
}
