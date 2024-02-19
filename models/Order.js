import Cart from './Cart.js';
import client from "../util/database.js";

export default class Order {
    constructor(idCustomer) {
        this.idCustomer = idCustomer;
    }
    async getCustomer() {
        const request = 'SELECT * FROM customer WHERE id = $1';
        const idParams = [this.idCustomer];
        const result = await client.query(request, idParams);
        return result.rows[0];
    }
}
// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');
// const Order = sequelize.define('order', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     quantity: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// });
// module.exports = Order;