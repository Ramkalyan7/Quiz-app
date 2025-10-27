import dotenv from "dotenv"
dotenv.config();
import Perplexity from "@perplexity-ai/perplexity_ai";




const perplexityCliet = new Perplexity({
    apiKey: process.env.PERPLEXITY_API_KEY
});

export const generateQuiz = async (userPrompt: string) => {

    const completion = await perplexityCliet.chat.completions.create({
        model: 'sonar',
        messages: [
            {
                role: 'user',
                content: `Create a 10-question multiple-choice quiz on ${userPrompt}. 
                  For each question provide four options, one correct answer, and a brief explanation.
                  For the tags field, strictly ANALYZE ONLY the user prompt. Extract main topics  or proper nouns as tags directly from the user's original input, and DO NOT INVENT or infer any topics from the generated quiz content. Never add general, related, or extra tags that were not present or implied in the user question.`
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
                                    options: {
                                        type: 'array',
                                        items: { type: 'string' }
                                    },
                                    answer: { type: 'string' },
                                    explanation: { type: 'string' }
                                },
                                required: ['question', 'options', 'answer', 'explanation']
                            }
                        },
                        tags: {
                            type: 'array',
                            items: { type: 'string' }
                        },
                        summary: { type: 'string' }
                    },
                    required: ['quiz', 'tags', 'summary']
                }
            }
        }
    });

    return completion;
}