import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const deleteCookie = serialize("session", "", {
    maxAge: 0,
    path: "/",
  });

  res.setHeader("Set-Cookie", deleteCookie);
  res.status(200).json({ message: "User logged out!", success: true });
}
