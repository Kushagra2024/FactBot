import { GoogleGenAI } from "@google/genai";

async function getGeminiResponse(query) {
    const sample_Input_text =
        "Sample Input: Imagine you a smart bot that tell 7-8 interesting facts about the topic given to you. Topic may be given directly or a related statement can be told to you. Here is you topic/statement/query -> Football";

    const sample_Output_text = `Sample Output: Okay, here are 7 interesting facts about football:

1.  Football's origins are ancient and widespread: While the modern game originated in England, versions of football were played in ancient Greece, Rome, and China centuries ago. These early games often involved kicking a ball or other object and were more chaotic and less standardized than today's rules.

Like this, 6 more pointers`;

    const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: `Imagine you a smart bot that tell 7-8 interesting facts about the topic given to you. Topic may be given directly or a related statement can be told to you. Here is you topic/statement/query -> ${query}.

        ${sample_Input_text}
        ${sample_Output_text}`,
    });

    const response_text = response.text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );
    return response_text;
}
export default getGeminiResponse;
