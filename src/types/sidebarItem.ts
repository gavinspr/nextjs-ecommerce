export interface BaseSidebarItem {
  title: string;
  href: string;
}

export interface SidebarSubItem extends BaseSidebarItem {}

export interface SidebarItem extends BaseSidebarItem {
  icon: React.ElementType;
  subItems?: SidebarSubItem[];
}