import { MongoClient } from "mongodb";
import { MONGODB_URL } from "../../../config/env";

async function handler(req, res) {
  const {
    method,
    query: { eventId },
  } = req;

  const client = await MongoClient.connect(MONGODB_URL);

  switch (method) {
    case "POST": {
      // add servier-side validation
      const { email, name, text } = req.body;

      if (
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
      ) {
        return res.status(422).json({ message: "Invalid input" });
      }

      const newComment = {
        email,
        name,
        text,
        eventId,
      };

      const db = client.db();

      const result = await db.collection("comments").insertOne(newComment);

      console.log(result);

      newComment.id = result.insertedId;

      return res
        .status(201)
        .json({ message: "Added comment", comment: newComment });
    }
    case "GET": {
      const dummyList = [
        { id: "c1", name: "Max", text: "A first comment!" },
        { id: "c2", name: "Manuel", text: "A second comment!" },
      ];

      return res.status(200).json({ comments: dummyList });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }

  client.close();
}

export default handler;
