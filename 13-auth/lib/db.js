import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const MONGODB_URL = process.env.MONGODB_URL || "";
  const client = await MongoClient.connect(MONGODB_URL);
  return client;
}
