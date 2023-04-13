import "dotenv/config";
import mongoose from "mongoose";
const getDataBaseConfg = require("./data-source");

async function main() {
  const databaseConfig = await getDataBaseConfg();
  const env = process.env.NODE_ENV || "dev";
  const uri = databaseConfig[env].uri;
  const username = process.env.MONGODB_USERNAME!;
  const password = process.env.MONGODB_PASSWORD!;

  mongoose.connect(uri, {
    auth: { username, password },
    dbName: "crud-mongo-docker",
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB!");
  });
}

main();
