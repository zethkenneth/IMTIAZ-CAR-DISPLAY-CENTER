import { hashPassword } from "./auth";

// Mock database
const users = [];

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and save user
    const hashedPassword = await hashPassword(password);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User created" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
