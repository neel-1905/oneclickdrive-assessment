import { updateStatus } from "@/lib/apis/listings.apis";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT")
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed!" });

  const { id, status } = req.body;

  if (!id || !status)
    return res
      .status(400)
      .json({ success: false, error: "Missing id or status" });

  const update = updateStatus(id, status);

  if (!update.success)
    return res.status(500).json({ success: false, error: update.message });

  return res.status(200).json({ success: true, message: "Status updated" });
}
