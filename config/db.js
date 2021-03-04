const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongooseURI");

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("mongoose connected");
  } catch (err) {
    console.log(err);

    //if found an error
    process.exit(1);
  }
};

module.exports = connectDB;
