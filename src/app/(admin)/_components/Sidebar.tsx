"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
import { SIDEBAR_ITEMS } from "@/constants/sidebarItems";
import { SidebarItem, SidebarSubItem } from "@/types/sidebarItem";
import { ChevronRight, ChevronUp, User2 } from "lucide-react";
import { FaShop } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// todo: footer

export const AppSidebar = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const isInitialLoad = useRef<boolean>(true);

  const pathname: string = usePathname();

  // Handle initial load - only open the dropdown with the active page
  useEffect(() => {
    if (isInitialLoad.current) {
      const isRefreshed: boolean =
        sessionStorage.getItem("sidebarRefreshed") === "true";

      const activeParent: string | undefined = SIDEBAR_ITEMS.find(
        (item) => item.subItems && isSubItemActive(item.subItems)
      )?.title;

      if (isRefreshed) {
        sessionStorage.removeItem("sidebarRefreshed");
      }

      setOpenItems(activeParent ? [activeParent] : []);

      isInitialLoad.current = false;
    }
  }, [pathname]);

  // Handle beforeunload for page refresh detection
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("sidebarRefreshed", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const toggleDropdown = (title: string) => {
    setOpenItems((prev: string[]) =>
      prev.includes(title)
        ? prev.filter((item: string) => item !== title)
        : [...prev, title]
    );
  };

  const isSubItemActive = (subItems: SidebarSubItem[]): boolean => {
    return subItems.some(
      (subItem: SidebarSubItem) => pathname === subItem.href
    );
  };

  const isActive = (href?: string): boolean => {
    return href ? pathname === href : false;
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
                  >
                    <SidebarMenuItem
                      data-active={isSubItemActive(item.subItems)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems.map((subItem: SidebarSubItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={menuButtonStyles(
                                  isActive(subItem.href)
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
                        {item.icon && <item.icon />}
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
