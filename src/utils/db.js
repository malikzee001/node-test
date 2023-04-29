const { MongoClient } = require("mongodb");
const { connect, connection } = require("mongoose");
const connectDB = async () => {
  const uri = "mongodb+srv://malikzee979:Zpih3rAKYcbjUCeH@cluster0.icjie5u.mongodb.net/?retryWrites=true&w=majority";

  try {
    console.log("connecting to database...");
    connect(uri, { useNewUrlParser: true });
    const db = connection;
    db.on("open", console.log.bind(console, "database connection opened..."));
    db.on("connected", console.log.bind(console, "database connected..."));
    db.on("error", console.error.bind(console, "database connection error..."));

    return;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  connectDB,
};
