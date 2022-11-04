import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  const filePath = path.join(process.cwd(), "data", "feedback.json");
  return filePath;
}

export function extractFeedback(filePath) {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}

function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      const filePath = buildFeedbackPath();
      const data = extractFeedback(filePath);
      res.status(200).json({ feedback: data });
      break;
    }
    case "POST": {
      const { email, text } = req.body;
      const newFeedback = {
        id: new Date().toISOString(),
        email,
        text,
      };

      // store that in a database or in a file
      const filePath = buildFeedbackPath();
      const data = extractFeedback(filePath);
      data.push(newFeedback);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      res.status(201).json({ message: "Success!", feedback: newFeedback });
      break;
    }
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default handler;
