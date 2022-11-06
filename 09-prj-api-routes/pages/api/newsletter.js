import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../../config/env";

async function connectDatabase() {
  const client = await MongoClient.connect(MONGODB_URL);
  return client;
}

async function insertDocument(client, document) {
  const db = client.db();

  await db.collection("newsletter").insertOne(document);
}

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
