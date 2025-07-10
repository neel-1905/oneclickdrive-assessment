import { LOG } from "@/types";

export async function logAction(data: Omit<LOG, "id" | "createdAt">) {
  const res = await fetch("/api/logs/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return { logResult: result, logResponse: res };
}
