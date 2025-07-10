import { LOG } from "@/types";
import { db } from "../../../db/schema";
import { randomUUID } from "crypto";

export const createLog = (data: Omit<LOG, "id" | "createdAt">) => {
  const { action, from, target_id, target_type, to, user_id, user_name } = data;

  try {
    const stmt = db.prepare(`
    INSERT INTO logs (id, user_id, user_name, action, target_type, target_id, "from", "to")
    VALUES (?,?,?,?,?,?,?,?)
              `);
    stmt.run(
      randomUUID(),
      user_id,
      user_name,
      action,
      target_type,
      target_id,
      from,
      to
    );

    return { success: true };
  } catch (error) {
    console.error("Failed to insert log:", error);
    return { success: false, error: `Failed to create log:,${error}` };
  }
};

export const getAllLogs = () => {
  try {
    const logs = db.prepare("SELECT * FROM logs").all();
    return logs;
  } catch (error) {
    console.error("Failed to get logs:", error);
    return { success: false, error: `Failed to get logs:,${error}` };
  }
};
