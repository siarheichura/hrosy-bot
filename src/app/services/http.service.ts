import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Dayjs } from 'dayjs'
import { environment } from '../../environments/environment'
import {
  ICategories,
  IHttpResponse,
  IOperation,
  IDayOperations,
  IWallets,
  OperationType
} from '../interfaces'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  get user(): { hash: string; id: number } | null {
    const user = localStorage.getItem('user')
    return JSON.parse(user)
  }

  setUserToLocalStorage(hash: string, id: number): void {
    if (!this.user) {
      localStorage.setItem('user', JSON.stringify({ hash, id }))
    }
  }

  //operations
  getOperations(
    type: OperationType,
    start: Dayjs,
    end: Dayjs
  ): Observable<IHttpResponse<IDayOperations[]>> {
    return this.http.get<IHttpResponse<IDayOperations[]>>(
      `${
        this.apiUrl
      }operations/${type}/${start.toISOString()}/${end.toISOString()}`
    )
  }

  updateOperation(
    id: string,
    operation: IOperation
  ): Observable<IHttpResponse<{ message: string }>> {
    return this.http.put<IHttpResponse<{ message: string }>>(
      `${this.apiUrl}categories/${id}`,
      { ...operation }
    )
  }

  deleteOperation(id: string): Observable<IHttpResponse<{ message: string }>> {
    return this.http.delete<IHttpResponse<{ message: string }>>(
      `${this.apiUrl}categories/${id}`
    )
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
