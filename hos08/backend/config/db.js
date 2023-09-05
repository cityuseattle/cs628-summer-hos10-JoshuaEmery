//Connect to mongo using Mongoose
//Mongoose is an ORM meaning that it manages both the connection
//to the database as well as providing objects that represent the
//data in the database

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
