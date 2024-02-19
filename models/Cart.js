import client from "../util/database.js";
import Product from "./Product.js";

class Cart {
    constructor(idCustomer) {
        this.idCustomer = idCustomer;
    }

    async getCart() {
        const cartItem = 'SELECT product.id as id_product, product.title, product.name as name_product, product.type, product.price, product.img_url, product.description, cart_item.quantity, cart.id as id_cart, customer.id, customer.firstname FROM cart JOIN cart_item ON cart.id = cart_item.id_cart JOIN product ON cart_item.id_product = product.id JOIN customer ON cart.id_customer = customer.id WHERE id_customer = $1';
        const idParams = [this.idCustomer];
        const result = await client.query(cartItem, idParams);
        return result.rows;
    }
    async addToCart(id) {
        const product = await Product.getProductById(id);
        const cart = await this.getCart();
        const productExist = cart.find(p => p.id_product === product.id);

        if (product.quantity === 0) {
            console.log('Product out of stock');
            return;
        }

        const requestProduct = 'UPDATE product SET quantity = $1 WHERE id = $2';
        const idParamsProduct = [product.quantity - 1, id];
        await client.query(requestProduct, idParamsProduct);
        if (productExist) {
            const newQuantity = productExist.quantity + 1;
            const id_cart = productExist.id_cart;
            const request = 'UPDATE cart_item SET quantity = $1 WHERE id_product = $2 AND id_cart = $3';
            const idParams = [newQuantity, productExist.id_product, id_cart];
            const result = await client.query(request, idParams);
            console.log('Product already in cart, updated quantity');
            return result;
        } else {
            const id_cart = cart[0].id_cart;
            const request = 'INSERT INTO cart_item (id_cart, id_product, quantity) VALUES ($1, $2, $3)';
            const idParams = [id_cart, product.id, 1];
            const result = await client.query(request, idParams);
            console.log('Product added to cart');
            return id_cart;
        }
    }
    async removeFromCart(id) {
        const cart = await this.getCart();
        const product = await Product.getProductById(id);
        const newQuantity = product.quantity + cart[0].quantity;

        const requestProduct = 'UPDATE product SET quantity = $1 WHERE id = $2';
        const idParamsProduct = [newQuantity, id];
        await client.query(requestProduct, idParamsProduct);
        
        const request = 'DELETE FROM cart_item WHERE id_product = $1';
        const idParams = [id];
        await client.query(request, idParams);
        console.log('Product removed from cart');
    }
}
export default Cart;