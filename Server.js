import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// DEMO AI (NO API)
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  const result = `
🔹 Short Summary:
- ${text.slice(0, 60)}...

🔹 Detailed Summary:
This text is about "${text.split(" ")[0]}" and related concepts.

🔹 Quiz:
1. What is the main topic?
A) AI B) Math C) Physics D) Biology  
Answer: A  

2. True/False: This text is about AI  
Answer: True
`;

  res.json({ result });
});

// START SERVER
app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🚀");
});