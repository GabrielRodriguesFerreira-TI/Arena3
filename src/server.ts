import "dotenv/config";
import mongoose from "mongoose";
import app from "./app";
const getDataBaseConfg = require("./data-source");

export async function connect() {
  const databaseConfig = await getDataBaseConfg();
  const env = process.env.NODE_ENV || "dev";
  const uri = databaseConfig[env].uri;
  const port = process.env.PORT!;

  mongoose.connect(uri, { autoIndex: true });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    console.log("Connected to MongoDB!");
    app.listen(port, () => {
      console.log("Server is running on port 3000!");
    });
  });
}

connect();
