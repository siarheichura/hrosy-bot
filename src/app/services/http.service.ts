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
  OperationType,
  IWallet
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

  getOperation(id: string): Observable<IHttpResponse<IOperation>> {
    return this.http.get<IHttpResponse<IOperation>>(
      `${this.apiUrl}operations/${id}`
    )
  }

  addOperation(
    operation: Partial<IOperation>
  ): Observable<IHttpResponse<IOperation>> {
    return this.http.post<IHttpResponse<IOperation>>(
      `${this.apiUrl}operations`,
      { ...operation }
    )
  }

  updateOperation(
    operation: IOperation
  ): Observable<IHttpResponse<IOperation>> {
    return this.http.put<IHttpResponse<IOperation>>(
      `${this.apiUrl}operations/${operation.id}`,
      { ...operation }
    )
  }

  deleteOperation(id: string): Observable<IHttpResponse<IOperation>> {
    return this.http.delete<IHttpResponse<IOperation>>(
      `${this.apiUrl}operations/${id}`
    )
  }

  // categories
  getCategories(): Observable<IHttpResponse<ICategories>> {
    return this.http.get<IHttpResponse<ICategories>>(`${this.apiUrl}categories`)
  }

  updateCategories(categories: ICategories): Observable<IHttpResponse<null>> {
    return this.http.put<IHttpResponse<null>>(`${this.apiUrl}categories`, {
      ...categories
    })
  }

  // wallets
  getWallets(): Observable<IHttpResponse<IWallet[]>> {
    return this.http.get<IHttpResponse<IWallet[]>>(
      `${environment.apiUrl}wallets`
    )
  }

  addWallet(data: Partial<IWallet>): Observable<IHttpResponse<IWallet>> {
    return this.http.post<IHttpResponse<IWallet>>(
      `${environment.apiUrl}wallets`,
      { ...data }
    )
  }

  updateWallet(data: Partial<IWallet>): Observable<IHttpResponse<IWallet>> {
    console.log('data http: ', data)
    return this.http.put<IHttpResponse<IWallet>>(
      `${environment.apiUrl}wallets/${data.id}`,
      { ...data }
    )
  }

  deleteWallet(id: string): Observable<IHttpResponse<null>> {
    return this.http.delete<IHttpResponse<null>>(
      `${environment.apiUrl}wallets/${id}`
    )
  }

  // currencies
  getAllCurrencies(): Observable<IHttpResponse<string[]>> {
    return this.http.get<IHttpResponse<string[]>>(
      `${environment.apiUrl}currencies`
    )
  }
}
