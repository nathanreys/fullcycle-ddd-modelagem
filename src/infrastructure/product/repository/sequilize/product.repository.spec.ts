import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";
import productRepository from "./product.repository";

describe("Product repository unit test", () => {
    let sequilize: Sequelize;

    beforeEach(async () => {
        sequilize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequilize.addModels([ProductModel]);
        await sequilize.sync();
    });

    afterEach(async () => {
        await sequilize.close();
    });

    it("should create a product", async () => {
        const productrepository = new productRepository();
        const product = new Product("1", "Product 1", 10);

        await productrepository.create(product);

        const productModel = await ProductModel.findOne({
            where: { id: "1" }
        });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 1",
            price: 10,
        });
    });

    it("should update a product", async () => {
        const productrepository = new productRepository();
        const product = new Product("1", "Product 1", 10);

        await productrepository.create(product);

        product.changeName("Product 2");
        product.changePrice(20);

        await productrepository.update(product);

        const productModel = await ProductModel.findOne({
            where: { id: "1" }
        });

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "Product 2",
            price: 20,
        });
    });

    it("should find a product", async () => {
        const productrepository = new productRepository();
        const product = new Product("1", "Product 1", 10);

        await productrepository.create(product);

        const productModel = await productrepository.find("1");

        expect(productModel).toStrictEqual(product);
    });

    it("should find all products", async () => { 
        const productrepository = new productRepository();
        const product1 = new Product("1", "Product 1", 10);
        const product2 = new Product("2", "Product 2", 20);

        await productrepository.create(product1);
        await productrepository.create(product2);

        const foundProducts = await productrepository.findAll();
        const products = [product1, product2];
        
        expect(products).toEqual(foundProducts);        
    });

});