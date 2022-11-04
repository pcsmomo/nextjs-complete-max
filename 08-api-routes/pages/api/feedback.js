import fs from "fs";
import path from "path";

function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json({ message: "This works!" });
      break;
    case "POST":
      const { email, text } = req.body;
      const newFeedback = {
        id: new Date().toISOString(),
        email,
        text,
      };

      // store that in a database or in a file
      const filePath = path.join(process.cwd(), "data", "feedback.json");
      const fileData = fs.readFileSync(filePath);
      const data = JSON.parse(fileData);
      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 4));

      res.status(201).json({ message: "Success!", feedback: newFeedback });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
