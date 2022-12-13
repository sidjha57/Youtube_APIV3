import * as dotenv from "dotenv"
import {Sequelize, DataTypes} from "sequelize"

dotenv.config()

const password = process.env.DATABASE_PASSWORD;
// console.log(process.env.DATABASE_PASSWORD);

const sequelize = new Sequelize("Youtube_Data", "sid", password, {
    dialect: "mysql",
    host: "localhost",
});

// sequelize.authenticate()
// .then(() => console.log("Successfully authenticated!"))
// .catch((err) => console.log("Database connection unsuccessful"));

export default sequelize;