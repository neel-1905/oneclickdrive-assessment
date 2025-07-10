import React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "../ui/sidebar";
import SideNavContent from "./SideNavContent";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
import { logAction } from "@/lib/apis/logs.actions";
import { useSessionUser } from "@/lib/useSessionUser";
import { useFeedback } from "@/context/FeedbackContext";

const SideNav = () => {
  const router = useRouter();
  const user = useSessionUser();
  const { show } = useFeedback();

  const handleLogout = async () => {
    if (!user) return;

    await fetch(`/api/logout`, {
      method: "POST",
    });

    await logAction({
      action: "logout",
      target_type: "user",
      target_id: user?.id,
      user_id: user?.id,
      user_name: user?.email,
    });

    show("success", "User logged out!");

    router.replace("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center gap-0 px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-medium">Listings App</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SideNavContent />
      <SidebarFooter className="py-3 px-4">
        <Button variant={`destructive`} onClick={handleLogout}>
          <LogOut />
          <span>Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideNav;
