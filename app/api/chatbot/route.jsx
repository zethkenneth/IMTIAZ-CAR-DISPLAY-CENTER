// app/api/chatbot/route.js
import axios from "axios";

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    console.log("Sending request to openai");
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key is missing" }), {
        status: 500,
      });
    }

    const response = await makeRequest(apiKey, message);
    return new Response(JSON.stringify({ reply: response }), { status: 200 });
  } catch (error) {
    console.error("Error contacting OpenAI:", error.message);
    return new Response(
      JSON.stringify({ error: `Internal Server Error: ${error}` }),
      {
        status: 500,
      }
    );
  }
}

async function makeRequest(apiKey, message) {
  const maxRetries = 3;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content.trim();
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.warn("Rate limit hit, retrying after delay...");
        await delay(1000); // Wait 1 second before retrying
        retries++;
      } else {
        throw error;
      }
    }
  }

  throw new Error("Max retries exceeded");
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
