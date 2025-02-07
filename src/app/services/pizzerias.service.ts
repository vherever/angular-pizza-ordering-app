import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PizzaModel, PizzeriaModel } from '../models';

@Injectable()
export class PizzeriasService {
  constructor(private readonly _httpClient: HttpClient) {
  }

  getPizzerias(): Observable<PizzeriaModel[]> {
    return this._httpClient.get<PizzeriaModel[]>(`${ environment.apiUrl }/pizzerias`);
  }

  getPizzeriaById(id: string): Observable<PizzeriaModel> {
    return this._httpClient.get<PizzeriaModel>(`${ environment.apiUrl }/pizzerias/${id}`);
  }

  getPizzasByPizzeriaId(id: string): Observable<PizzaModel[]> {
    return this._httpClient.get<PizzaModel[]>(`${ environment.apiUrl }/pizzerias/${id}/pizzas`);
  }
}
