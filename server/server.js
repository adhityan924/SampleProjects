const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { OpenAI } = require('openai');
const pdf = require('pdf-parse');
require('dotenv').config();

const app = express();
const upload = multer();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Extract text from PDF
    const data = await pdf(req.file.buffer);
    const resumeText = data.text;

    // Generate questions using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a professional interviewer. Based on the resume provided, generate 5 specific behavioral interview questions that are tailored to the candidate's experience and skills."
        },
        {
          role: "user",
          content: `Here's the resume text: ${resumeText}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    // Extract questions from the response
    const questions = completion.choices[0].message.content
      .split('\n')
      .filter(line => line.trim().length > 0);

    res.json({ questions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to analyze resume' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
