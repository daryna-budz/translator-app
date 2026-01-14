import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors()); 
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/translate', async (req, res) => {
    const { text, targetLang } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });
        const prompt = `Translate this to ${targetLang}. Return ONLY translated text: "${text}"`;
        
        const result = await model.generateContent(prompt);
        res.json({ translation: result.response.text() });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
