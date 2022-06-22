import dotenv from "dotenv";
import connectDB from "./config/db";
import { Product, User } from "./models";
import products from "./data/Products";
import users from "./data/users";

import "colors";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const user_id = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: user_id };
        });

        await Product.insertMany(sampleProducts);

        console.log("Data imported successfully".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

if (process.argv[4] === "-d") {
    destroyData();
} else importData();
