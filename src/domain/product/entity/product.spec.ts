import { Product } from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrowError("id is required");
  })

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("name is required");
  })

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "product 1", 0);
    }).toThrowError("Price must be greater than zero");
  })

  it("should change name", () => {
    const product = new Product("123", "test", 100);
    product.changeName("test2");
    expect(product.name).toBe("test2");
  })

  it("should change price", () => {
    const product = new Product("123", "test", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  })
})