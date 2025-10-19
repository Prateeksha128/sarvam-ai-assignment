import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI with environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// Store chat sessions (in production, you'd use a proper database)
const chatSessions = new Map();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Check if API key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY environment variable is not set");
      return res.status(500).json({
        error: "Server configuration error: API key not configured",
      });
    }

    const { message, context, sessionId = "default" } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log(`📤 Processing message for session ${sessionId}:`, message);

    // Get or create chat session
    let chatSession = chatSessions.get(sessionId);
    if (!chatSession) {
      console.log(`🤖 Creating new chat session for ${sessionId}`);
      chatSession = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: context || "You are a helpful assistant." }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 512,
          temperature: 0.7,
        },
      });
      chatSessions.set(sessionId, chatSession);
    }

    // Send message to Gemini
    console.log("🔄 Calling Gemini API...");
    const result = await chatSession.sendMessage(message);
    const response = result.response.text();

    console.log("📥 Gemini response received:", response);

    return res.status(200).json({
      response: response || "(No response)",
      sessionId,
    });
  } catch (error) {
    console.error("❌ Gemini API error:", error);
    console.error("Error details:", {
      message: error?.message,
      stack: error?.stack,
      name: error?.name,
    });

    // Return a user-friendly error message
    return res.status(500).json({
      error: `Sorry, I encountered an error: ${
        error?.message || "Could not reach AI service"
      }`,
    });
  }
}

// API to clear chat session
export async function clearSession(req, res) {
  const { sessionId = "default" } = req.body;
  chatSessions.delete(sessionId);
  return res.status(200).json({ message: "Session cleared" });
}
