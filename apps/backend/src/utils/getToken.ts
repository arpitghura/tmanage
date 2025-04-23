import { Request } from "express";

export function getTokenFromRequest(req: Request): string | null {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader || typeof authorizationHeader !== 'string' || !authorizationHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authorizationHeader.split(" ")[1];
  return token || null;
}