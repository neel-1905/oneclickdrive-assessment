import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "../ui/sidebar";
import SideNavContent from "./SideNavContent";

const SideNav = () => {
  return (
    <Sidebar>
      <SidebarHeader className="h-14 justify-center gap-0 px-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-medium">Listings App</h1>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SideNavContent />
      <SidebarFooter />
    </Sidebar>
  );
};

export default SideNav;
