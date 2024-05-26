
import { GoogleGenerativeAI } from "@google/generative-ai";
// Initialize Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);




export const aiChatController = async (req, res, next) => {
  const { prompt } = req.body;
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });

    const result = await model.generateContent(prompt);
    const response =  result.response;
    const text = response.text();
    res.send(text);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to generate content");
  }
};
