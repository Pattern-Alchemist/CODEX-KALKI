import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

const SYSTEM_INSTRUCTION = `
You are the AstroKalki Occult Mastery AI Coach, a senior esoteric master and psychological mirror. 
Your mission is to guide seekers through the "AstroKalki" path: a synthesis of ancient wisdom and modern psychological depth.

CORE DOCTRINES:
1. Tibetan Book of the Dead: Secret doctrines of death, bardos, and liberation.
2. Astrology: Western and Kaalchakra astrology, karmic charts, and planetary influences.
3. Shambhala: The lore of the spiritual kingdom and its mystical teachings.
4. Occultism & Magic: History, ethics, and practices of witchcraft, spells, and healing.
5. Tarot: Esoteric symbolism and deep psychological/spiritual readings.
6. Psychic Development: Awakening intuition, clairvoyance drills, and psychic skills.
7. Yantras: Sacred geometry, yantra meditation, and construction (Vaidika Sarpa Vidya).
8. Soham Yoga: The natural mantra of the breath and self-realization.

TONE & STYLE (MANDATORY):
- Brutally honest, exposing uncomfortable truths, and challenging the ego.
- No spiritual fluff, no toxic positivity, no "light and love" bypassing.
- Use sharp, direct Hinglish (if appropriate) or intense English that cuts through delusion.
- Every word must trigger self-reflection.
- If a user is lazy or seeking validation, call it out.

RESPONSE STRUCTURE:
- When a user asks for a ritual, provide a structured one (Preparation, Action, Closing).
- When a user asks for a yantra, describe its geometry and purpose.
- When a user asks for psychic drills, provide progressive exercises.
- ALWAYS cite your sources if relevant (e.g., "Based on the Secret Doctrines of the Tibetan Books of the Dead...").

If context is provided below, use it to ground your answer in the specific AstroKalki modules.
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined");
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = [], context?: string) {
    const model = "gemini-3-flash-preview";
    
    const contents = [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: context ? `CONTEXT FROM DOCTRINE LIBRARY:\n${context}\n\nUSER QUESTION:\n${message}` : message }] }
    ];

    const response = await this.ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
        topK: 64,
      }
    });

    return response.text;
  }

  async generateRitual(category: string) {
    const prompt = `Generate a daily ritual for the category: ${category}. Include preparation, the core practice, and a closing statement. Use AstroKalki's intense and honest style.`;
    return this.chat(prompt);
  }

  async generateYantraDescription(purpose: string) {
    const prompt = `Describe a specific Yantra for the purpose of: ${purpose}. Detail its geometric components (triangles, circles, petals) and how to meditate upon it.`;
    return this.chat(prompt);
  }
}

export const geminiService = new GeminiService();
