import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit tests", () => {
    it("should create a customer", () => {
        let customer = CustomerFactory.create("Customer");

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer");
        expect(customer.address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("Street", 1, "Zipcode", "City");

        let customer = CustomerFactory.createWithAddress("Customer", address);

        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Customer");
        expect(customer.address).toBe(address);
    });
});