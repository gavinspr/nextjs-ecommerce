export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  subItems?: SidebarSubItem[];
}

export type SidebarSubItem = Pick<SidebarItem, "title" | "href">;
