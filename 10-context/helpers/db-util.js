import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../config/env";

export async function connectDatabase() {
  const client = await MongoClient.connect(MONGODB_URL);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}