import { createLog } from "@/lib/apis/logs.apis";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed!" });

  const { action, from, target_id, target_type, to, user_id, user_name } =
    req.body;

  //   if (!id) return res.status(400).json({ success: false, error: "Missing id" });

  const createdLog = createLog({
    action,
    from,
    target_id,
    target_type,
    to,
    user_id,
    user_name,
  });

  if (!createdLog.success)
    return res.status(500).json({ success: false, error: createdLog.error });

  return res.status(200).json({ success: true, message: "Listing updated" });
}
