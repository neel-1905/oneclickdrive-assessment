import React from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { navRoutes } from "@/constants";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SideNavContent = () => {
  const pathname = usePathname();

  return (
    <SidebarContent className="px-2 py-2">
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navRoutes?.map((route) => {
              const isActive = pathname === route.url;

              return (
                <SidebarMenuItem key={route.title}>
                  <SidebarMenuButton
                    asChild
                    className="py-5"
                    isActive={isActive}
                  >
                    <Link href={route.url}>
                      {route.icon && <route.icon />}
                      <span>{route.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export default SideNavContent;
