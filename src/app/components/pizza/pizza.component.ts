import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { PizzeriasService, SettingsService } from '../../services';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { PizzaModel, PizzeriaModel } from '../../models';
import { OrderStoreService } from '../../services/order-store.service';
import { map } from 'rxjs';

type TaxRateKey = 'au_tax_rate' | 'nz_tax_rate' | 'us_tax_rate';

@Component({
    selector: 'app-pizza',
    templateUrl: './pizza.component.html',
    styleUrls: ['./pizza.component.scss'],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [PizzeriasService, SettingsService],
    imports: [AsyncPipe, NgForOf, NgIf],
})
export class PizzaComponent {
    @Input() selectedPizzeria!: PizzeriaModel;
    @Input() pizza!: PizzaModel;

    private readonly _orderStoreService = inject(OrderStoreService);
    private readonly _settingsService = inject(SettingsService);

    private readonly usTaxRate$ = this._settingsService.getSettings().pipe(map((settings) => settings.us_tax_rate));

    public pizzaTax$ = this.usTaxRate$.pipe(
        map((usTaxRate) => {
            const countryTaxKey = `${this.selectedPizzeria.country.toLowerCase()}_tax_rate` as TaxRateKey;
            return this.pizza.is_taxed ? usTaxRate : this.pizza[countryTaxKey];
        })
    );

    public onImageError(event: Event): void {
        (event.target as HTMLImageElement).src = 'images/pizza-default.png';
    }

    public onAddClick(): void {
        this._orderStoreService.addPizzaToSelection(this.pizza);
    }
}
