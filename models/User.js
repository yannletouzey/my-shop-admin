import bcrypt from "bcrypt";
import validator from "validator";
import client from "../util/database.js";

class User {
    constructor(data) {
        this.id = data.id;
        this.email = data.email;
        this.emailConfirm = data.emailConfirm;
        this.lastname = data.lastname;
        this.firstname = data.firstname;
        this.password = data.password;
        this.passwordConfirm = data.passwordConfirm;
        this.phone = data.phone;
        this.address = data.address;
        this.number = data.number;
        this.city = data.city;
        this.zip_code = data.zip_code;
    }
    static async getUserById(id) {
        const request = `SELECT * FROM customer WHERE id = $1`;
        const idParams = [id];
        const result = await client.query(request, idParams);
        return result.rows[0];
    }
    static async getUserByEmail(email) {
        try {
            let error = "";
            if (!validator.isEmail(email)) {
                return error = "Email are not valid";
            }
            const request = `SELECT * FROM customer WHERE email = $1`;
            const emailParams = [email];
            const result = await client.query(request, emailParams);
            return result.rows[0];
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    static async getAllUser() {
        const request = `SELECT * FROM customer`;
        const result = await client.query(request);
        return result.rows;
    }
    async signup() {
        try {
            let error = "";
            if (!validator.isEmail(this.email) || this.email !== this.emailConfirm) {
                return error = "Email and email confirmation are not valid";
            }
            if (this.password !== this.passwordConfirm) {
                return error = "Password and password confirmation are not same";
            }
            const optionPassword = {
                minLength: 8,
                minLowercase: 1,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1
            };
            if (!validator.isStrongPassword(this.password, optionPassword))  {
                return error = "Password is not strong ex: 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol";
            }
            const existEmail = await User.getUserByEmail(this.email);
            if (existEmail) {
                return error = "Email already exists";
            }
            const password = await bcrypt.hash(this.password, 10);
            const request = `INSERT INTO customer (email, lastname, firstname, password) VALUES ($1, $2, $3, $4) RETURNING id`;
            const valueParams = [this.email, this.lastname, this.firstname, password];
            await client.query(request, valueParams);
            const email = valueParams[0].email;
            return email;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    static async login(email, password) {
        try {
            const request = `SELECT * FROM customer WHERE email = $1`;
            const loginParams = [email];
            const result = await client.query(request, loginParams);
            const pass = await bcrypt.compare(password, result.rows[0].password);
            if (pass) {
                return result.rows[0];
            } else {
                console.log('error');
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}
export default User;