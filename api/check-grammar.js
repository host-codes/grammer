export default async function handler(req, res) {
  const { text } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a grammar checker. When given a sentence, point out incorrect parts and explain them in detail.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
