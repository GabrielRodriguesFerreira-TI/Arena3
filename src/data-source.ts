import "dotenv/config";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongoTesteServer = new MongoMemoryServer();

export const databaseConfig = {
  dev: {
    uri: process.env.MONGODB_URL!,
  },
  test: {
    uri: mongoTesteServer.getUri(),
  },
};
