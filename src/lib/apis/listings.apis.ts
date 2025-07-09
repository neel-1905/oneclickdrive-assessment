import { CAR_RENTAL, CAR_RENTAL_UPDATE, STATUS } from "@/types";
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

export function updateStatus(id: string, status: STATUS) {
  try {
    const stmt = db.prepare(`
      UPDATE listings SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
      `);

    const result = stmt.run(status, id);

    if (!result.changes) {
      return { success: false, message: "Listing not found!" };
    }
    return { success: true, message: "Listing status updated" };
  } catch (error: any) {
    console.log("Error updating", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}

export function updateListing(id: string, data: Partial<CAR_RENTAL>) {
  try {
    const { name, location, price_per_day, status } = data;
    const stmt = db.prepare(`
      UPDATE listings SET name = ?, location = ?, price_per_day = ?, status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?
      `);

    const result = stmt.run(name, location, price_per_day, status, id);

    if (!result.changes)
      return { success: false, message: "Listing not found!" };

    return { success: true, message: "Listing updated" };
  } catch (error: any) {
    console.log("Error updating", error);
    return { success: false, message: error.message || "Something went wrong" };
  }
}
