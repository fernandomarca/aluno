import { Product } from "../entity/product";
import ProductInterface from "../entity/product.interface";
import { randomUUID } from "node:crypto";
import { ProductB } from "../entity/product-b";

// export enum Types {
//   "a",
//   "b"
// }
type Type = "a" | "b" | "c";

export default class ProductFactory {
  public static create(type: Type, name: string, price: number): ProductInterface {
    switch (type) {
      case "a":
        return new Product(randomUUID(), name, price);
      case "b":
        return new ProductB(randomUUID(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}