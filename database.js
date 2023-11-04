const mongoose = require(`mongoose`);

URI = "mongodb://localhost:27017/BooksDatabase";

const connectToDB = async () => {
  await mongoose.connect(URI);
  console.log("connected to Database");
};

module.exports = connectToDB;
