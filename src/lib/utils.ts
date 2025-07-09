import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { NextApiRequest } from "next";
import { parse } from "cookie";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSessionUser(req: NextApiRequest) {
  const cookies = parse(req.headers.cookie || "");
  const session = cookies.session;

  if (!session) return null;

  return JSON.parse(session);
}
