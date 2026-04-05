import express from "express";
import cors from "cors";
import multer from "multer";
import pdf from "pdf-parse";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const dataBuffer = req.file.buffer;

    // Extract text from PDF
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;

    // Send to AI
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an AI tutor."
        },
        {
          role: "user",
          content: `From this text:\n${text}\n\nGive:
1. Short summary
2. Bullet notes
3. 5 MCQs with answers`
        }
      ],
    });

    const result = response.choices[0].message.content;

    res.json({
      result
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
});

app.listen(8000, () => {
  console.log("Server running on port 8000 🚀");
});