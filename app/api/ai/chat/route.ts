import { NextResponse } from "next/server";
import { getAiAssistantResponse } from "@/lib/openai";

export async function POST(req: Request) {
    try {
        const { message, context } = await req.json();
        const reply = await getAiAssistantResponse(message, context);
        return NextResponse.json({ reply });
    } catch (error) {
        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
