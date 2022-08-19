import NotificationError from "../../@shared/notification/notification.error";
import { Address } from "../value-object/address";
import { Customer } from "./customer"

describe("customer unit tests", () => {
  it("should throw error when id is empty", () => {
    // expect(() => {
    //   new Customer("", "Jhon");
    // }).toThrowError("Id is required");
    expect(() => {
      new Customer("", "Jhon");
    }).toThrowError(new NotificationError([
      {
        message: "Id is required",
        context: "customer"
      }
    ]));
  })

  it("should throw error when name is empty", () => {
    // expect(() => {
    //   new Customer("123", "");
    // }).toThrowError("Name is required");
    expect(() => {
      new Customer("123", "");
    }).toThrowError(new NotificationError([
      {
        message: "Name is required",
        context: "customer"
      }
    ]));
  })

  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "Jhon");
    //Act
    customer.changeName("Jane");
    //Assert
    expect(customer.name).toBe("Jane");
  })

  it("should activate customer", () => {
    //Arrange
    const customer = new Customer("123", "Jhon");
    const address = new Address("Street 1", 123, "13330", "são paulo");
    customer.setAddress(address);
    //Act
    customer.activate();
    //Assert
    expect(customer.isActive()).toBe(true);
  })

  it("should deactivate customer", () => {
    //Arrange
    const customer = new Customer("123", "Jhon");
    //Act
    customer.deactivate();
    //Assert
    expect(customer.isActive()).toBe(false);
  })

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      //Arrange
      const customer = new Customer("123", "Jhon");
      //Act
      customer.activate();
      //Assert
    }).toThrowError(new NotificationError([
      {
        message: "address is mandatory to activate a customer",
        context: "customer"
      }
    ]))
  })

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
})