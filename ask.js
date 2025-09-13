import fetch from "node-fetch";

export default async function handler(req, res) {
  const question = req.query.question || "No question provided";
  const API_KEY = process.env.GEMINI_API_KEY;

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY;

  const payload = {
    contents: [
      {
        parts: [{ text: question }]
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No answer received";

    res.status(200).send(answer);
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
}
