import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY || "";

export function verifyJWT(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function signJWT(payload: any, options?: jwt.SignOptions) {
  return jwt.sign(payload, JWT_SECRET, options);
}
