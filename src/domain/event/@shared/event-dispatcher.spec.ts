import Address from "../../entity/address";
import Customer from "../../entity/customer";
import CustomerChangedAddressEvent from "../customer/customer-changed-address.event";
import CustomerAddressChangedEvent from "../customer/customer-changed-address.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import SendMessage1WhenCustomerIsCreatedHandler from "../customer/handler/send-message-1-when-customer-is-created.handler";
import SendMessage2WhenCustomerIsCreatedHandler from "../customer/handler/send-message-2-when-customer-is-created.handler";
import SendMessageWhenAddressIsChangedHandler from "../customer/handler/send-message-when-address-is-changed.event";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
    /* ******* */
    /* Product */
    /* ******* */
    it("should register a product event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister a product event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);
    });

    it("should unregister all product event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();
    });

    it("should notify all product event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            price: 10,
        });

        eventDispatcher.notify(productCreatedEvent);
        expect(spyEventHandler).toHaveBeenCalled();
    });


    /* ******** */
    /* Customer */
    /* ******** */
    it("should register a customer event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendMessage2WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const eventHandler3 = new SendMessageWhenAddressIsChangedHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler3);
    });

    it("should unregister a customer event handler", () => {
        const eventDispatcher = new EventDispatcher();

        const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const eventHandler2 = new SendMessageWhenAddressIsChangedHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler2);

        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(0);

        eventDispatcher.unregister("CustomerChangedAddressEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(0);
    });

    it("should unregister all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);

        const eventHandler2 = new SendMessageWhenAddressIsChangedHandler();
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler2);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler2);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"]).toBeUndefined();
    });

    it("should notify all customer event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendMessage1WhenCustomerIsCreatedHandler();
        const eventHandler2 = new SendMessage2WhenCustomerIsCreatedHandler();
        const eventHandler3 = new SendMessageWhenAddressIsChangedHandler();

        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
        const spyEventHandler3 = jest.spyOn(eventHandler3, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
        eventDispatcher.register("CustomerChangedAddressEvent", eventHandler3);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]).toMatchObject(eventHandler3);

        const customer = new Customer("1", "Customer Name");
        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.address
        });

        eventDispatcher.notify(customerCreatedEvent);
        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();

        const address = new Address("Street", 1, "Zipcode 1", "City 1");        
        customer.changeAddress(address);

        const customerChangedAddressEvent = new CustomerChangedAddressEvent({
            id: customer.id,
            name: customer.name,
            address: customer.address
        });

        eventDispatcher.notify(customerChangedAddressEvent);
        expect(spyEventHandler3).toHaveBeenCalled();        
    });
});