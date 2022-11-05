import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../../config/env";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      return res.status(422).json({ message: "Invalid email address." });
    }

    const client = await MongoClient.connect(MONGODB_URL);
    const db = client.db();

    await db.collection("newsletter").insertOne({ email: userEmail });

    client.close();

    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
