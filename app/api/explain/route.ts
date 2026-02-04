import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
  try {
    const { term } = await req.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    const completion = await groq.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [
    {
      role: "system",
      content: "Explain financial terms simply in 2 sentences."
    },
    {
      role: "user",
      content: term
    }
  ],
});


    return NextResponse.json({
      explanation: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("Groq Error:", error);
    return NextResponse.json(
      { explanation: "AI explanation failed." },
      { status: 500 }
    );
  }
}
