
import ProductInterface from "./product.interface";

export class ProductB implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._name = name,
      this._id = id,
      this._price = price,
      this.validate()
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("id is required")
    }
    if (this._name.length === 0) {
      throw new Error("name is required")
    }
    if (this._price <= 0) {
      throw new Error("Price must be greater than zero")
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate()
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate()
  }

  get price(): number {
    return this._price * 2;
  }
}