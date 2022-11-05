function handler(req, res) {
  const {
    method,
    query: { eventId },
  } = req;

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
        id: new Date().toISOString(),
        email,
        name,
        text,
      };

      console.log(newComment);

      return res
        .status(201)
        .json({ message: "Added comment", comment: newComment });
    }
    case "GET": {
      const dummyList = [
        { id: "c1", name: "Max", texts: "A first comment!" },
        { id: "c2", name: "Manuel", texts: "A second comment!" },
      ];

      return res.status(200).json({ comments: dummyList });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
