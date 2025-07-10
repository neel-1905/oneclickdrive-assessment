import { getUser } from "@/lib/apis/users.apis";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ error: "Method is not allowed!", success: false });

  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ error: "Please fill all the fields", success: false });

    const user = getUser(email);

    if (!user || user.password !== password)
      return res
        .status(401)
        .json({ error: "Invalid user details!", success: false });

    const cookie = serialize(
      "session",
      JSON.stringify({ email: user.email, id: user.id }),
      {
        path: "/",
        httpOnly: true,
      }
    );

    res.setHeader("Set-Cookie", cookie);

    return res.status(200).json({
      message: "User login successful!",
      success: true,
      user: { id: user.id },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Something went wrong: ${err}`, success: false });
  }
}
