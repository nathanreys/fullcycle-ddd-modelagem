import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("Id is required");
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("1", "");
        }).toThrow("Name is required");
    });

    it("should change name ", () => {
        const customer = new Customer("1", "John");
        customer.changeName("Jane");
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer ", () => {
        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 1, "12345-678", "City 1");
        customer.changeAddress(address);

        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate customer ", () => {
        const customer = new Customer("1", "Customer 1");

        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw erro when address is undefined when you activate a customer", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });
});
