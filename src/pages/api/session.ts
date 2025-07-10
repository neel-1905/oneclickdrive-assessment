import type { NextApiRequest, NextApiResponse } from "next";
import { getSessionUser } from "@/lib/utils";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = getSessionUser(req);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  return res.status(200).json({ user });
}
