// Example: Fetch session user in useEffect
import { USER } from "@/types";
import { useEffect, useState } from "react";

export function useSessionUser() {
  const [user, setUser] = useState<USER>(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/session");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  return user;
}
