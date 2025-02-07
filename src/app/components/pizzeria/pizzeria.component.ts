import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PizzeriasService } from '../../services';
import { catchError, map, of, shareReplay, startWith, throwError } from 'rxjs';
import { PizzasComponent } from '../pizzas/pizzas.component';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-pizzeria-component',
  templateUrl: './pizzeria.component.html',
  styleUrl: './pizzeria.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PizzeriasService],
  imports: [AsyncPipe, NgIf, RouterLink, PizzasComponent, OrderComponent],
})
export class PizzeriaComponent {
  private readonly _route = inject(ActivatedRoute);

  private readonly _pizzeriasService = inject(PizzeriasService);

  private readonly selectedPizzeriaID = String(this._route.snapshot.paramMap.get('id'));

  public readonly selectedPizzeria$ = this._pizzeriasService.getPizzeriaById(this.selectedPizzeriaID).pipe(
    startWith(null),
    shareReplay(1),
    catchError((error) => throwError(() => error)),
  );

  public readonly isLoading$ = this.selectedPizzeria$.pipe(
    map((pizzeria) => !pizzeria),
    catchError(() => {
      return of(false);
    }),
  );
}

