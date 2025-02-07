import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { OrderStoreService } from '../../services/order-store.service';
import { BehaviorSubject, map, Observable, shareReplay, withLatestFrom } from 'rxjs';
import { PizzaModel, PizzaTransformedModel, PizzeriaModel, SumTotal } from '../../models';
import { SettingsService } from '../../services';
import { OrderService } from '../../services/order.service';
import { OrderCalculationHelper } from './order-calculation-helper';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SettingsService, OrderService],
  imports: [AsyncPipe, NgForOf, NgIf, NgTemplateOutlet],
})
export class OrderComponent {
  @Input() selectedPizzeria!: PizzeriaModel;

  private readonly _orderStoreService = inject(OrderStoreService);
  private readonly _orderService = inject(OrderService);
  private readonly _settingsService = inject(SettingsService);

  private readonly _isOrderConfirmedSubject = new BehaviorSubject<boolean>(false);
  private readonly _isOrderConfirmationLoadingSubject = new BehaviorSubject(false);

  public readonly isOrderConfirmed$ = this._isOrderConfirmedSubject.asObservable();
  public readonly isOrderConfirmationLoading$ = this._isOrderConfirmationLoadingSubject.asObservable();

  public readonly selectedPizzas$ = this._orderStoreService.selectedPizzas$.pipe(
    map((pizzas) => OrderCalculationHelper.transSelectedPizzasData(pizzas)),
    shareReplay(1),
  );

  public readonly usTaxRate$ = this._settingsService.getSettings().pipe(map((settings) => settings.us_tax_rate));

  public sumTotal$: Observable<SumTotal> = this.selectedPizzas$.pipe(
    withLatestFrom(this.usTaxRate$),
    map(([pizzas, usTaxRate]) => OrderCalculationHelper.calculateTotal(pizzas, usTaxRate)),
  );

  public onRemoveClick(pizza: PizzaModel): void {
    this._orderStoreService.removeAllPizzasById(pizza.id);
  }

  public onMinusClick(pizza: PizzaModel): void {
    this._orderStoreService.removeOnePizzasById(pizza.id);
  }

  public onPlusClick(pizza: PizzaModel): void {
    this._orderStoreService.addPizzaToSelection(pizza);
  }

  public onConfirmClick(selectedPizzas: PizzaTransformedModel[]): void {
    this._isOrderConfirmationLoadingSubject.next(true);
    this._orderService.confirmOrder(selectedPizzas).pipe().subscribe(() => {
      this._isOrderConfirmedSubject.next(true);
      this._isOrderConfirmationLoadingSubject.next(false);
    });
  }

  public onNewOrderClick(): void {
    this._orderStoreService.removeAllPizzas();
    this._isOrderConfirmedSubject.next(false);
  }

  public trackById(_: number, item: PizzaTransformedModel): number {
    return item.id;
  }
}
