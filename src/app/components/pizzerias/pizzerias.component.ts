import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PizzeriasService } from '../../services';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PizzeriaModel } from '../../models';
import { map, Observable, shareReplay, startWith } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pizzerias',
  templateUrl: './pizzerias.component.html',
  styleUrl: './pizzerias.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PizzeriasService],
  imports: [AsyncPipe, NgForOf, NgIf],
})
export class PizzeriasComponent {
  private readonly _pizzeriasService = inject(PizzeriasService);
  private readonly _router = inject(Router);

  public readonly pizzerias$ = this._pizzeriasService.getPizzerias().pipe(
    startWith([]),
    shareReplay(1), // Prevent calling the API twice
  );

  public readonly isPizzeriasLoading$: Observable<boolean> = this.pizzerias$.pipe(map((pizzas) => pizzas.length === 0));

  public trackById(_: number, item: PizzeriaModel): number {
    return item.id;
  }

  public onPizzeriaClick(pizzeria: PizzeriaModel): void {
    this._router.navigate(['/pizzerias', pizzeria.id + 1]).then();
  }
}
