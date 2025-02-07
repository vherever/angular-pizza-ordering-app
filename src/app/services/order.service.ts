import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaTransformedModel } from '../models';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {
  constructor(private readonly _httpClient: HttpClient) {
  }

  /**
   * TODO: we can also send already calculated data to the back-end.
   * Sending selection model only, the back-end will also calculate the total.
   * @param reqData
   */
  confirmOrder(reqData: PizzaTransformedModel[]): Observable<void> {
    return this._httpClient.post<void>(`${ environment.apiUrl }/confirm_order`, reqData);
  }
}
