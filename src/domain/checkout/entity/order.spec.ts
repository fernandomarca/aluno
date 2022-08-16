import Order from "./Order";
import OrderItem from "./OrderItem";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("customerId is required");
  })

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "234", []);
    }).toThrowError("Item qtd must be granted than 0");
  })

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);

    const order = new Order("123", "234", [item, item2]);
    const total = order.total();
    expect(total).toBe(300);
  })

  it("should throw error if the item qte is less or equal 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      const item2 = new OrderItem("i2", "Item 2", 50, "p2", 2);
      new Order("o1", "123", [item, item2]);
    }).toThrowError("Quantity must be greater than 0");
  })

})