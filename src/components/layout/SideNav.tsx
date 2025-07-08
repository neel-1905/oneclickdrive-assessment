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

const SideNav = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`/api/logout`, {
      method: "POST",
    });

    router.replace("/");
    // window.location.href = "/"
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
