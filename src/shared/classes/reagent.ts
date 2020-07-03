export class Reagent {
  currency: string;
  currency_id: number;
  id: number;
  manufacturer: string;
  manufacturer_id: number;
  name: string;
  price: number;
  unit: string;
  units_id: number;
  quantity: number = 1;

  constructor(currency: string, currency_id: number, id: number, manufacturer: string, manufacturer_id: number, name: string, price: number, unit: string, units_id: number, quantity: number = 1) {
    this.currency = currency;
    this.currency_id = currency_id;
    this.id = id;
    this.manufacturer = manufacturer;
    this.manufacturer_id = manufacturer_id;
    this.name = name;
    this.price = price;
    this.unit = unit;
    this.units_id = units_id;
    this.quantity = quantity;
  }

  // setquantity(value: number): void {
  //   this.quantity = value;
  // }
}
