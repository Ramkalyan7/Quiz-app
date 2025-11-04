import dotenv from "dotenv"

dotenv.config();
import Perplexity from "@perplexity-ai/perplexity_ai";

const perplexityClient = new Perplexity({
    apiKey: process.env.PERPLEXITY_API_KEY
});


export const generateQuiz = async (userPrompt: string) => {


  try {
    const completion = await perplexityClient.chat.completions.create({
      model: 'sonar-pro', 
      messages: [
        {
          role: 'user',
          content: `Quiz: ${userPrompt}
Generate 10 MC questions (question, 4 options, answer, explanation).
Tags: Extract from input only.`
        }
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          schema: {
            type: 'object',
            properties: {
              quiz: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    question: { type: 'string' },
                    options: { type: 'array', items: { type: 'string' } },
                    answer: { type: 'string' },
                    explanation: { type: 'string' }
                  },
                  required: ['question', 'options', 'answer', 'explanation']
                }
              },
              tags: { type: 'array', items: { type: 'string' } },
              summary: { type: 'string' }
            },
            required: ['quiz', 'tags', 'summary']
          }
        }
      },
    });
    
    return completion;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw error;
  }
}
