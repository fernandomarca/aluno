export class Address {
  private _street: string = "";
  private _number: number = 0;
  private _zip: string = "";
  private _city: string = "";

  constructor(
    street: string,
    number: number,
    zip: string,
    city: string
  ) {
    this._street = street,
      this._number = number,
      this._zip = zip,
      this._city = city,
      this.validate();
  }
  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }

    if (this.zip.length === 0) {
      throw new Error("zip is required");
    }

    if (this.city.length === 0) {
      throw new Error("city is required");
    }

    if (this.number === 0) {
      throw new Error("number is required");
    }
  }
  toString() {
    return `${this.street} ${this.number} ${this.city} ${this.zip}`
  }
}