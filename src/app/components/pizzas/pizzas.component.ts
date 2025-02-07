import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PizzeriasService } from '../../services';
import { catchError, map, of, shareReplay, startWith, throwError } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PizzaComponent } from '../pizza/pizza.component';
import { PizzaModel, PizzeriaModel } from '../../models';

@Component({
  selector: 'app-pizzas',
  templateUrl: './pizzas.component.html',
  styleUrls: ['./pizzas.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PizzeriasService],
  imports: [AsyncPipe, NgForOf, NgIf, PizzaComponent],
})
export class PizzasComponent {
  @Input() selectedPizzeria!: PizzeriaModel;

  private readonly _route = inject(ActivatedRoute);

  private readonly _pizzeriasService = inject(PizzeriasService);

  private readonly selectedPizzeriaID = String(this._route.snapshot.paramMap.get('id'));

  public readonly pizzas$ = this._pizzeriasService.getPizzasByPizzeriaId(this.selectedPizzeriaID).pipe(
    startWith(null),
    shareReplay(1),
    catchError((error) => throwError(() => error)),
  );

  public readonly isLoading$ = this.pizzas$.pipe(
    map((pizza) => !pizza),
    catchError(() => {
      return of(false);
    }),
  );

  public trackById(_: number, item: PizzaModel): number {
    return item.id;
  }
}
