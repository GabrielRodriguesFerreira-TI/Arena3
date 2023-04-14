import "dotenv/config";
import mongoose from "mongoose";
const getDataBaseConfg = require("./data-source");

async function main() {
  const databaseConfig = await getDataBaseConfg();
  const env = process.env.NODE_ENV || "dev";
  const uri = databaseConfig[env].uri;
  const port = process.env.PORT!;

  mongoose.connect(uri);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB!");
  });
}

main();
