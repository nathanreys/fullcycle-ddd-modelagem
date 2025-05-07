import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    
    it("should throw error when id is empty", () => {
        expect(() => {
            let order = new Order("", "1", []);
        }).toThrow("Id is required");
    });    

    it("should throw error when customerId is empty", () => {
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrow("CustomerId is required");
    });    

    it("should throw error when item is empty", () => {
        expect(() => {
            let order = new Order("1", "1", []);
        }).toThrow("Items are required");
    });

    it ("should calculate total", () => {
        const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
        const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
        
        const order = new Order("1", "1", [item1]);
        let total = order.total();

        expect(total).toBe(20);

        const order2 = new Order("2", "1", [item1,item2]);

        total = order2.total();
        expect(total).toBe(60);
    });

    it ("should throw error if the item quantity is less or equal than zero", () => {                
        expect(() => {
            const item1 = new OrderItem("1", "Item 1", 10, "p1", 0);        
            const order = new Order("1", "1", [item1]);
        }).toThrow("Quantity must be greater than zero");        
    });
});
