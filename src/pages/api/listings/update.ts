import { updateListing, updateStatus } from "@/lib/apis/listings.apis";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT")
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed!" });

  const { id, name, location, price_per_day, status } = req.body;

  if (!id) return res.status(400).json({ success: false, error: "Missing" });

  const update = updateListing(id, { name, location, price_per_day, status });

  if (!update.success)
    return res.status(500).json({ success: false, error: update.message });

  return res.status(200).json({ success: true, message: "Listing updated" });
}
