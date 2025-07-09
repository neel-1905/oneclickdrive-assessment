import { CAR_RENTAL } from "@/types";
import { db } from "../../../db/schema";

const LIMIT = 8;

export function getAllListings(
  page = 1,
  limit = LIMIT
): { listings: CAR_RENTAL[]; totalCount: number } {
  const offset = (page - 1) * limit;
  try {
    const listingStmt = db.prepare(
      "SELECT * FROM listings ORDER BY createdAt DESC LIMIT ? OFFSET ?"
    );
    const listings = listingStmt.all(limit, offset) as CAR_RENTAL[];

    const totalListingsStmt = db.prepare(
      "SELECT COUNT(*) as count FROM listings"
    );
    const totalListings = totalListingsStmt.get() as { count: number };
    const totalCount = totalListings.count;

    return { listings, totalCount };
  } catch (err) {
    console.error("Error fetching listings:", err);
    return { listings: [], totalCount: 0 };
  }
}
