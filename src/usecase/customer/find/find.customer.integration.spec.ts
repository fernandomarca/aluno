import { Sequelize } from "sequelize-typescript";
import { Customer } from "../../../domain/customer/entity/customer";
import { Address } from "../../../domain/customer/value-object/address";
import CustomerModel from "../../../infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infra/customer/repository/sequelize/customer.repository";
import ProductModel from "../../../infra/product/repository/sequilize/product.model";
import FindCustomerUsecase from "./find.customer.usecase";

function customerFactory() {
  const customer = new Customer("123", "John");
  const address = new Address("street", 123, "zip", "city")
  customer.setAddress(address);
  return customer;
}

describe("Test find customer use case", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    });
    sequelize.addModels([CustomerModel])
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  })

  it("should find a customer", async () => {
    const customer = customerFactory();
    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer)

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
})