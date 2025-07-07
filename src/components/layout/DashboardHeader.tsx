import React from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { navRoutes } from "@/constants";
import { usePathname } from "next/navigation";

const DashboardHeader = () => {
  const pathName = usePathname();

  const pageTitle = navRoutes?.find((route) => route.url === pathName)?.title;

  return (
    <header className="h-[57px] py-2 px-4 border-b border-sidebar-border sticky top-0 z-10 bg-background">
      <div className="flex items-center size-full py-2.5 gap-4">
        <SidebarTrigger />

        <Separator orientation="vertical" className="bg-black/50" />

        <h1 className="text-xl font-semibold capitalize">{pageTitle}</h1>
        {/* <div className="flex items-center gap-2">
              other things
            </div> */}
      </div>
    </header>
  );
};

export default DashboardHeader;
