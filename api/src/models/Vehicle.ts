export default class Vehicle {
  public id: number;
  public seller_id: number;
  public brand: string;
  public model: string;
  public name: string;
  public year: number;
  public price: number;
  public type: string;
  public mileage: number;
  public transmission: string;
  public fuel_type: string;
  public engine: string;

  constructor(data: any) {
    this.id = Number(data.id);
    this.seller_id = Number(data.seller_id);
    this.brand = data.brand as string;
    this.brand = data.brand as string;
    this.model = data.model as string;
    this.name = (data.name === undefined) ? this.brand + ' ' + this.model : data.name as string;
    this.year = Number(data.year); 
    this.price = Number(data.price); 
    this.type = data.type as string;
    this.mileage = Number(data.mileage);
    this.transmission = data.transmission as string;
    this.fuel_type = data.fuel_type as string;
    this.engine = data.engine as string;
  }
}
