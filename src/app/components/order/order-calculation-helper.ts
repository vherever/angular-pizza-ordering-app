import { PizzaModel, PizzaTransformedModel, SumTotal } from '../../models';

export class OrderCalculationHelper {
  static transSelectedPizzasData(pizzas: PizzaModel[]): PizzaTransformedModel[] {
    return Object.values(
      pizzas.reduce<Record<number, PizzaTransformedModel>>((acc, item) => {
        if (!acc[item.id]) {
          acc[item.id] = { ...item, times: 0 };
        }
        acc[item.id].times++;
        return acc;
      }, {}),
    );
  }

  static calculateTotal(pizzas: PizzaTransformedModel[], usTaxRate: string): SumTotal {
    const totalData = pizzas.reduce(
      (acc, pizza) => {
        const taxRate = pizza.is_taxed ? parseFloat(usTaxRate) : 0;
        const pizzaPrice = parseFloat(pizza.price) * pizza.times;
        const pizzaTax = taxRate * pizza.times;

        acc.totalTax += pizzaTax;
        acc.totalWithoutTax += pizzaPrice;
        return acc;
      },
      { totalTax: 0, totalWithoutTax: 0 },
    );

    return {
      totalTax: parseFloat(totalData.totalTax.toFixed(2)),
      totalWithoutTax: parseFloat(totalData.totalWithoutTax.toFixed(2)),
      totalWithTax: parseFloat((totalData.totalTax + totalData.totalWithoutTax).toFixed(2)),
    };
  }
}
