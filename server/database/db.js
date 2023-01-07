const mongoose = require("mongoose");

const Connection = async (username, password) => {
  const URL = `mongodb+srv://${username}:${password}@cluster0.ild9s.mongodb.net/?retryWrites=true&w=majority`;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Connected Successfully!!");
  } catch (error) {
    console.log("Error while connecting to the database: ", error);
  }
};

module.exports = Connection;
