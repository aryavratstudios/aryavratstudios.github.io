import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        // Check if API key is available
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json({ 
                reply: "AI assistant is currently unavailable. Please set up the OPENAI_API_KEY environment variable to enable this feature." 
            }, { status: 503 });
        }
        
        const { getAiAssistantResponse } = await import("@/lib/openai");
        const { message, context } = await req.json();
        const reply = await getAiAssistantResponse(message, context);
        return NextResponse.json({ reply });
    } catch (error) {
        console.error("AI Chat Error:", error);
        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
