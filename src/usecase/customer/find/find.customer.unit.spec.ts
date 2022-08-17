import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import FindCustomerUsecase from "./find.customer.usecase";

const customerFactory = () => {
  const customer = new Customer("123", "John");
  const address = new Address("street", 123, "zip", "city")
  customer.setAddress(address);
  return customer;
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customerFactory())),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();

    const input = {
      id: "123"
    }

    const output = {
      id: "123",
      name: "John",
      address: {
        street: "street",
        city: "city",
        number: 123,
        zip: "zip",
      }
    }
    const findCustomerUsecase = new FindCustomerUsecase(customerRepository);
    const result = await findCustomerUsecase.execute(input);

    expect(result).toEqual(output);
  })

  it("should not find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    })
    const input = {
      id: "id-not-exist"
    }
    const findCustomerUsecase = new FindCustomerUsecase(customerRepository);

    expect(async () => {
      return await findCustomerUsecase.execute(input);
    }).rejects.toThrow(new Error("Customer not found"))

  })
})