import Address from "./customer/value-object/address";
import Customer from "./customer/entity/customer";
import OrderItem from "./checkout/entity/order_item";
import Order from "./checkout/entity/order";

let customer = new Customer("1", "Nathan Reys");
const address = new Address("Street 1", 1, "Zip", "City");
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 15, "p2", 2);

const order = new Order("1", "1", [item1, item2]);
