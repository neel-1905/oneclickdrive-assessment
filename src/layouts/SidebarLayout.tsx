import DashboardHeader from "@/components/layout/DashboardHeader";
import SideNav from "@/components/layout/SideNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <SideNav />
      <div className="flex-1 bg-background flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 flex flex-col gap-5">{children}</main>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
