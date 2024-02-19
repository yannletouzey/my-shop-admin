// const Sequelize = require('sequelize');
// const client = new Sequelize(
//     'my_shop', 
//     'root', 
//     'PanaME75013', 
//     {
//         dialect: 'mysql',
//         host: 'localhost'
//     }
// );

// const mysql = require('mysql2');

// const client = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'PanaME75013',
//     database: 'my_shop'
// });

// module.exports = client.promise();



import pg from 'pg';
const client = new pg.Client({
    host: 'localhost',
    user: 'yzey',
    password: 'PanaME',
    database: 'myshop',
    port: 5432
});
client.connect();
export default client;