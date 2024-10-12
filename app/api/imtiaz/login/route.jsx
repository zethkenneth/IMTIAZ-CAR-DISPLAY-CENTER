import { NextResponse } from "next/server";
import { verifyPassword, generateToken } from "./auth";
import cookie from "cookie"; // Don't forget to import cookie if you're using it

// Mock database
const users = [];

export async function POST(req) {
  try {
    const body = await req.json();

    const { username, password } = body;

    // Check if user exists
    const user = users.find((user) => user.username === username);

    if (!user || !(await verifyPassword(password, user.password))) {
      return NextResponse.json(
        { status: 401 },
        { message: "Invalid credentials" }
      );
    }

    // Generate token
    const token = generateToken({ username });

    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 3600, // 1 hour
      path: "/",
    };

    const setCookie = cookie.serialize("token", token, cookieOptions);

    const userDetails = {
      firstname: user.firstname,
      lastname: user.lastname,
    };

    const response = NextResponse.json({ status: 200 }, { user: userDetails });

    // Set the cookie in the response headers
    response.headers.append("Set-Cookie", setCookie);

    return response;
  } catch (err) {
    console.error("Error processing request:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 } // Set status code for internal server error
    );
  }
}

// Optional: You can also handle other methods (like GET) if needed
export async function GET() {
  return NextResponse.json(
    { message: "This endpoint supports POST only" },
    { status: 400 }
  );
}
