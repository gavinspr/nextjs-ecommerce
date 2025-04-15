"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { SIDEBAR_ITEMS } from "@/constants/sidebar-items";
import { SidebarItem } from "@/types/sidebar-item";
import { FaShop } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LuChevronRight } from "react-icons/lu";

export const AppSidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const isInitialLoad = useRef<boolean>(true);

  const pathname = usePathname();

  // Handle initial load - only open the dropdown with the active page on refresh
  useEffect(() => {
    if (isInitialLoad.current) {
      const pathSegments = pathname.split("/").filter(Boolean);
      const firstSegment = pathSegments[0]?.toLowerCase();

      const activeGroup = SIDEBAR_ITEMS.find(
        (item) => item.title.toLowerCase() === firstSegment
      );

      setOpenItems(activeGroup ? [activeGroup.title] : []);
      isInitialLoad.current = false;
    }
  }, [pathname]);

  const toggleDropdown = (title: string) => {
    setOpenItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href?: string, isSubItem: boolean = false): boolean => {
    if (!href) return false;

    return isSubItem
      ? pathname === href || pathname.startsWith(`${href}/`)
      : pathname === href;
  };

  const menuButtonStyles = (active: boolean): string =>
    cn(
      "rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      active && "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
    );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex flex-row mt-2">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <FaShop className="size-4" />
        </div>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Kait</span>
          <span className="truncate text-xs">Clothing Company</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Store Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SIDEBAR_ITEMS.map((item: SidebarItem) =>
                item.subItems ? (
                  <Collapsible
                    key={item.title}
                    asChild
                    open={openItems.includes(item.title)}
                    onOpenChange={() => toggleDropdown(item.title)}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon && (
                            <div className="text-lg">
                              <item.icon />
                            </div>
                          )}
                          <span>{item.title}</span>
                          <LuChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={menuButtonStyles(
                                  isActive(subItem.href, true)
                                )}
                              >
                                <Link href={subItem.href}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={menuButtonStyles(isActive(item.href))}
                    >
                      <Link href={item.href}>
                        {item.icon && (
                          <div className="text-lg">
                            <item.icon />
                          </div>
                        )}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
