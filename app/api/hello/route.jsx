// app/api/hello/route.js
export async function GET(request) {
  try {
    return new Response(JSON.stringify({ message: "Hello, World!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
