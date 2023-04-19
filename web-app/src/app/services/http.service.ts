import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import * as dayjs from 'dayjs'
import { environment } from '../../environments/environment'
import {
  ICategories,
  IHttpResponse,
  IOperation,
  IDayOperations,
  IWallet,
  IGetOperationOptions,
  IStatistics,
  OperationType,
  IPeriod,
  ITransfer,
  ICategory
} from '@app/interfaces'

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

  // operations
  getOperations(
    options: IGetOperationOptions
  ): Observable<IHttpResponse<IDayOperations[]>> {
    const { type, filters, period } = options
    const { sort, wallets, categories, comment } = filters
    const start = period.start.format(environment.dateFormat)
    const end = period.end.format(environment.dateFormat)

    const queryString =
      `?sort=${sort}` +
      (wallets?.length ? `&wallets=${wallets}` : '') +
      (categories?.length ? `&categories=${categories}` : '') +
      (comment ? `&comment=${comment}` : '')

    return this.http.get<IHttpResponse<IDayOperations[]>>(
      `${this.apiUrl}operations/${type}/${start}/${end}${queryString}`
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
      {
        ...operation,
        createdAt: dayjs(operation.createdAt).format(environment.dateFormat)
      }
    )
  }

  updateOperation(
    operation: IOperation
  ): Observable<IHttpResponse<IOperation>> {
    return this.http.put<IHttpResponse<IOperation>>(
      `${this.apiUrl}operations/${operation.id}`,
      {
        ...operation,
        createdAt: dayjs(operation.createdAt).format(environment.dateFormat)
      }
    )
  }

  deleteOperation(id: string): Observable<IHttpResponse<IOperation>> {
    return this.http.delete<IHttpResponse<IOperation>>(
      `${this.apiUrl}operations/${id}`
    )
  }

  // categories
  getCategories(): Observable<IHttpResponse<ICategory[]>> {
    return this.http.get<IHttpResponse<ICategory[]>>(`${this.apiUrl}categories`)
  }

  addCategory(
    category: Partial<ICategory>
  ): Observable<IHttpResponse<ICategory>> {
    return this.http.post<IHttpResponse<ICategory>>(
      `${this.apiUrl}categories`,
      category
    )
  }

  updateCategory(category: ICategory): Observable<IHttpResponse<ICategory>> {
    return this.http.put<IHttpResponse<ICategory>>(
      `${this.apiUrl}categories/${category.id}`,
      category
    )
  }

  deleteCategory(id: string): Observable<IHttpResponse<ICategory>> {
    return this.http.delete<IHttpResponse<ICategory>>(
      `${this.apiUrl}categories/${id}`
    )
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

  // transfers
  getTransfers(period: IPeriod): Observable<IHttpResponse<ITransfer[]>> {
    const start = period.start.format(environment.dateFormat)
    const end = period.end.format(environment.dateFormat)

    return this.http.get<IHttpResponse<ITransfer[]>>(
      `${this.apiUrl}transfers/${start}/${end}`
    )
  }

  addTransfer(
    transfer: Partial<ITransfer>
  ): Observable<IHttpResponse<ITransfer>> {
    return this.http.post<IHttpResponse<ITransfer>>(`${this.apiUrl}transfers`, {
      ...transfer
    })
  }

  updateTransfer(
    transfer: Partial<ITransfer>
  ): Observable<IHttpResponse<ITransfer>> {
    return this.http.put<IHttpResponse<ITransfer>>(
      `${this.apiUrl}transfers/${transfer.id}`,
      {
        ...transfer
      }
    )
  }

  deleteTransfer(id: string): Observable<IHttpResponse<ITransfer>> {
    return this.http.delete<IHttpResponse<ITransfer>>(
      `${this.apiUrl}transfers/${id}`
    )
  }

  // statistics
  getStatistics(
    type: OperationType,
    walletId: string,
    period: IPeriod
  ): Observable<IHttpResponse<IStatistics>> {
    const start = period.start.format(environment.dateFormat)
    const end = period.end.format(environment.dateFormat)

    return this.http.get<IHttpResponse<IStatistics>>(
      `${environment.apiUrl}statistics/${type}/${walletId}/${start}/${end}`
    )
  }

  // currencies
  getAllCurrencies(): Observable<IHttpResponse<string[]>> {
    return this.http.get<IHttpResponse<string[]>>(
      `${environment.apiUrl}currencies`
    )
  }
}
