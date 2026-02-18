import OpenAI from "openai";

// Lazy initialization - only create client when actually needed
function getOpenAIClient() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing OPENAI_API_KEY environment variable");
    }
    return new OpenAI({ apiKey });
}

export async function generatePortfolioDescription(projectName: string, serviceType: string, brief: string) {
    try {
        const openai = getOpenAIClient();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a world-class creative director at a high-end digital agency. Write a concise, punchy 1-2 line description for a portfolio project. Focus on the impact and craftsmanship."
                },
                {
                    role: "user",
                    content: `Project Name: ${projectName}\nService: ${serviceType}\nBrief: ${brief}`
                }
            ],
            max_tokens: 100,
        });

        return response.choices[0].message.content?.trim();
    } catch (error) {
        console.error("OpenAI Error:", error);
        return null;
    }
}

export async function getAiAssistantResponse(message: string, context: string) {
    try {
        const openai = getOpenAIClient();
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are the Aryavrat Studio AI Assistant. You are professional, sophisticated, and helpful. You represent an elite digital agency.
                    Context about the current environment/user: ${context}`
                },
                {
                    role: "user",
                    content: message
                }
            ],
            max_tokens: 300,
        });

        return response.choices[0].message.content?.trim();
    } catch (error) {
        console.error("OpenAI Assistant Error:", error);
        return "I apologize, but I'm having trouble connecting to my central intelligence. Please try again or join our Discord for immediate support.";
    }
}
