import DashboardHeader from "@/components/layout/DashboardHeader";
import SideNav from "@/components/layout/SideNav";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { ReactNode } from "react";

const SidebarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <SideNav />
        <div className="flex flex-col flex-1 w-full bg-background">
          <DashboardHeader />
          <main className="flex flex-col flex-1 w-full p-4 gap-5 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default SidebarLayout;
