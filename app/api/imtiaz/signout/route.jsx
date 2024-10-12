import cookie from "cookie";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Set cookie
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: new Date(0),
      path: "/",
    };

    // Serialize cookie to clear token
    const setCookie = cookie.serialize("token", "", cookieOptions);

    const response = NextResponse.json(
      { status: 200 },
      { user: null, message: "Logout successfully." }
    );

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
