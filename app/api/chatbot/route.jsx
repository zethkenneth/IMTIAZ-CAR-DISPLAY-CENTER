import { NextResponse } from "next/server";
import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.GPT_KEY,
});

export async function POST(req) {
  const { message } = await req.json();
  console.log("Test");

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful car enthusiasts and car mechanic which can suggest the best way to use and fix the car. reject all none related car topics",
      },
      { role: "user", content: message },
    ],
    model: "gpt-4",
  });

  try {
    return NextResponse.json({
      status: 200,
      response: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({
      status: 500,
      error: "Server Error",
      details: error,
    });
  }
}
