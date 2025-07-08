import { USER } from "@/types";
import { db } from "../../../db/schema";

export function getUser(email: string): USER {
  try {
    const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
    const user = stmt.get(email);

    if (!user) {
      console.log(`User with email ${email} not found!`);
      return null;
    }

    return user as USER;
  } catch (error) {
    console.log("Error fetching:", error);
    return null;
  }
}
