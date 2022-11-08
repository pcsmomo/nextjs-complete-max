import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const {
    method,
    query: { eventId },
  } = req;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed" });
    return;
  }

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
        res.status(422).json({ message: "Invalid input" });
        client.close();
        return;
      }

      const newComment = {
        email,
        name,
        text,
        eventId,
      };

      let result;
      try {
        result = await insertDocument(client, "comments", newComment);
        newComment._id = result.insertedId;
        return res
          .status(201)
          .json({ message: "Added comment", comment: newComment });
      } catch (error) {
        res.status(500).json({ message: "Inserting comment failed" });
      }
    }
    case "GET": {
      try {
        const documents = await getAllDocuments(
          client,
          "comments",
          {
            _id: -1,
          },
          { eventId: eventId }
        );
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: "Getting comments failed." });
      }
    }
    default:
    // res.setHeader("Allow", ["GET", "PUT"]);
    // res.status(405).end(`Method ${method} Not Allowed`);
  }

  client.close();
}

export default handler;