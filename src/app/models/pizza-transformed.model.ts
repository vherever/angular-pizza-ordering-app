import { PizzaModel } from './pizza.model';

export interface PizzaTransformedModel extends PizzaModel {
  times: number;
  [key: `${string}_tax_rate`]: string; // Index signature for dynamic tax rates
}
