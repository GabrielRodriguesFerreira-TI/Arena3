import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";

async function getDataBaseConfg() {
  const mongoServer = await MongoMemoryServer.create();

  const databaseConfig = {
    dev: {
      uri: process.env.MONGODB_URL!,
    },
    test: {
      uri: mongoServer.getUri(),
    },
  };

  return databaseConfig;
}

module.exports = getDataBaseConfg;
