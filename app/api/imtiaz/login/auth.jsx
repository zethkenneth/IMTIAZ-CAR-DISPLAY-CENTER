import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Imtiaz2024"; // Use a secure secret key

// Function to hash password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

// Function to verify password
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Function to generate a JWT token
export function generateToken(user) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "1h" });
}

// Function to verify a JWT token
export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
