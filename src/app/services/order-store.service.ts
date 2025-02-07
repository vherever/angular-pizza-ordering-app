import { Injectable } from '@angular/core';
import { PizzaModel } from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * @description Order store. Can be updated to use NgRx.
 */
@Injectable({ providedIn: 'root' })
export class OrderStoreService {
  private readonly _selectedPizzasSubject: BehaviorSubject<PizzaModel[]> = new BehaviorSubject<PizzaModel[]>([]);

  /**
   * @param value
   */
  addPizzaToSelection(value: PizzaModel): void {
    this._selectedPizzasSubject.next([...this._selectedPizzasSubject.getValue(), value]);
  }

  /**
   * @param id
   */
  removeAllPizzasById(id: number): void {
    const updated = this._selectedPizzasSubject.getValue().filter((pizza) => pizza.id !== id);
    this._selectedPizzasSubject.next([...updated]);
  }

  /**
   * @param id
   */
  removeOnePizzasById(id: number): void {
    const selection = this._selectedPizzasSubject.getValue();
    const index = selection.findIndex(pizza => pizza.id === id);
    if (index !== -1) {
      selection.splice(index, 1);
      this._selectedPizzasSubject.next(selection);
    }
  }

  removeAllPizzas(): void {
    this._selectedPizzasSubject.next([]);
  }

  get selectedPizzas$(): Observable<PizzaModel[]> {
    return this._selectedPizzasSubject.asObservable();
  }
}
