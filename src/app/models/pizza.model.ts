export interface PizzaModel {
  id: number;
  name: string;
  price: string;
  is_taxed: boolean;
  au_tax_rate: string;
  nz_tax_rate: string;
  us_tax_rate: string;
  description: string;
  image_url: string;
  available_in_pizzerias: number[];
}
