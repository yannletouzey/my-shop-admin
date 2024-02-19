import client from '../util/database.js';
import validator from 'validator';

class Product {
  constructor(title, name, type, price, quantity, img_url, description) {
    this.title = title;
    this.name = name;
    this.type = type;
    this.price = price;
    this.img_url = img_url;
    this.quantity = quantity;
    this.description = description;
    this.adminId = 2;
  }
  static async getProductById(id) {
    const request = `SELECT * FROM product WHERE id = $1`;
    const idParams = [id];
    const result = await client.query(request, idParams);
    return result.rows[0];
  }

  static async getAllProduct() {
    // const request = await client.query('SELECT * FROM product');
    // return request.rows;
    const request = `SELECT * FROM admin JOIN product ON admin.id = product.admin_id`;
    const result = await client.query(request);
    return result.rows;
  }
  static async getLastProduct() {
    const request = await client.query('SELECT * FROM product ORDER BY id DESC LIMIT 3');
    return request.rows;
  }
  async addProduct() {
    if (!validator.isURL(this.img_url) || this.img_url === '' || this.img_url === null) {
      const randImgId = Math.floor(Math.random() * 100) + 1;
      this.img_url = `https://picsum.photos/id/${randImgId}/200/300`;
    }
    const request = `INSERT INTO product (title, name, type, price, quantity, img_url, description, admin_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`;
    const valueParams = [this.title, this.name, this.type, this.price, this.quantity, this.img_url, this.description, this.adminId];
    await client.query(request, valueParams);
    const nameProductAdded = valueParams[1];
    return nameProductAdded;
  }
  static async deleteProduct(id) {
    const request = `DELETE FROM product WHERE id = $1`;
    const idParams = [id];
    await client.query(request, idParams);
  }
  static getEditProduct(id) {
    const request = `SELECT * FROM product WHERE id = $1`;
    const idParams = [id];
    return client.query(request, idParams);
  }
  async editProduct(id) {
    const request = `UPDATE product SET title = $1, name = $2, type = $3, price = $4, quantity = $5, img_url = $6, description = $7 WHERE id = $8`;
    const valueParams = [this.title, this.name, this.type, this.price, this.quantity, this.img_url, this.description, id];
    await client.query(request, valueParams);
    const nameProductUpdated = valueParams[1];
    return nameProductUpdated;
  }
}
export default Product;