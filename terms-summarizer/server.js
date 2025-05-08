const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/summarize', async (req, res) => {
  const { text } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant that summarizes legal documents in plain English." },
        { role: "user", content: `Summarize the following terms and conditions in a simple and clear way:\n\n${text}` }
      ],
      temperature: 0.5,
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarize text' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
