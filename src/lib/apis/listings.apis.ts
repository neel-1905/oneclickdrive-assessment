import { CAR_RENTAL } from "@/types";
import { db } from "../../../db/schema";

export function getAllListings(): CAR_RENTAL[] {
  try {
    const stmt = db.prepare("SELECT * FROM listings ORDER BY createdAt DESC");
    return stmt.all() as CAR_RENTAL[];
  } catch (err) {
    console.error("Error fetching listings:", err);
    return [];
  }
}
