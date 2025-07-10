import { CAR_RENTAL, STATUS } from "@/types";
import { db } from "../../../db/schema";

export function getAllListings({
  page = 1,
  limit = 8,
  status,
  location,
  carName,
}: {
  page: number;
  limit: number;
  status?: STATUS;
  location?: string;
  carName?: string;
}): { listings: CAR_RENTAL[]; totalCount: number } {
  const offset = (page - 1) * limit;

  let base = "FROM listings WHERE 1=1";
  const params: any[] = [];

  if (status) {
    base += " AND status = ?";
    params.push(status);
  }

  if (location) {
    base += " AND location LIKE ?";
    params.push(`%${location}%`);
  }

  if (carName) {
    base += " AND name LIKE ?";
    params.push(`%${carName}%`);
  }

  try {
    const totalStmt = db.prepare(`SELECT COUNT(*) as count ${base}`);
    const { count } = totalStmt.get(...params) as { count: number };

    const listingStmt = db.prepare(`
      SELECT * ${base} 
      ORDER BY createdAt DESC 
      LIMIT ? OFFSET ?
    `);
    const listings = listingStmt.all(...params, limit, offset) as CAR_RENTAL[];

    return {
      listings,
      totalCount: count,
    };
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

export function getAllLocations(): string[] {
  try {
    const stmt = db.prepare(
      `SELECT DISTINCT location FROM listings ORDER BY location`
    );
    const rows = stmt.all() as { location: string }[];

    return rows.map((row) => row.location);
  } catch (err) {
    console.error("Error fetching locations:", err);
    return [];
  }
}
