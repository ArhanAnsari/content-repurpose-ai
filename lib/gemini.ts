import { GoogleGenAI } from '@google/genai';
import { GeneratedContent } from '../types';

const SYSTEM_PROMPT = `Act as an expert content strategist.

Based on the following topic provided by the user, generate:
1. 5 viral YouTube Shorts ideas (very catchy, short hooks)
2. 10 tweets (engaging, short, modern tone)
3. 1 LinkedIn post (professional, storytelling tone)
4. 1 blog outline (clear headings and sections)

Return STRICT JSON in this format:

{
  "shorts": ["...", "..."],
  "tweets": ["...", "..."],
  "linkedin": "...",
  "blog": ["Heading 1", "Heading 2"]
}

Do not include markdown or explanations.`;

export async function generateContent(topic: string): Promise<GeneratedContent> {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Missing GEMINI_API_KEY environment variable. Please add it to your .env.local file.');
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: topic }] },
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: 'application/json',
      }
    });

    const text = response.text || '';
    if (!text) throw new Error('Empty response from Gemini API');

    const parsed: GeneratedContent = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw new Error('Failed to generate content');
  }
}
