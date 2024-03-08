const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017";

const connectToMongo = () => {
  mongoose.connect(mongoURI).then(() => {
      console.log("Connected to MongoDB successfully...");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

module.exports = connectToMongo;
