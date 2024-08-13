import { verifyPassword, generateToken } from "./auth";

// Mock database
const users = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Check if user exists
    const user = users.find((user) => user.username === username);
    if (!user || !(await verifyPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken({ username });

    // Set cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 3600, // 1 hour
        path: "/",
      })
    );

    res.status(200).json({ message: "Logged in successfully" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
