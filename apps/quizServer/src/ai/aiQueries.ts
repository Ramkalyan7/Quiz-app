import dotenv from "dotenv";
import { QuizResponseType } from "@repo/common";

dotenv.config();

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL || "gemini-2.0-flash";

const quizSchema = {
  type: "object",
  properties: {
    quiz: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            minItems: 4,
            maxItems: 4
          },
          answer: { type: "string" },
          explanation: { type: "string" }
        },
        required: ["question", "options", "answer", "explanation"]
      }
    },
    tags: {
      type: "array",
      items: { type: "string" }
    },
    summary: { type: "string" }
  },
  required: ["quiz", "tags", "summary"]
};

function extractTextFromGeminiResponse(data: any): string {
  const candidate = data?.candidates?.[0];

  if (!candidate) {
    throw new Error("Gemini returned no candidates");
  }

  const text = candidate?.content?.parts
    ?.map((part: { text?: string }) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
}

export const generateQuiz = async (userPrompt: string): Promise<QuizResponseType> => {
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${geminiApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [
              {
                text: "You generate quizzes as strict JSON only."
              }
            ]
          },
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `Quiz: ${userPrompt}
Generate exactly 5 multiple choice questions.
Each question must include a question, exactly 4 options, the correct answer as the full option text, and a short explanation.
Tags must be extracted only from the user input.
Return valid JSON matching the provided schema.`
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: quizSchema
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const quizJson = extractTextFromGeminiResponse(data);

    return JSON.parse(quizJson) as QuizResponseType;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};
