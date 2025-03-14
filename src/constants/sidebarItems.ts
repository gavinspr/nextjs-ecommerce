import { SidebarItem } from "@/types/sidebarItem";
import {
  LuBox,
  LuChartLine,
  LuClipboardList,
  LuGauge,
  LuLayoutDashboard,
  LuMegaphone,
  LuSettings,
  LuUsers,
} from "react-icons/lu";

export const SIDEBAR_ITEMS: Array<SidebarItem> = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LuGauge,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: LuBox,
    subItems: [
      {
        title: "Product List",
        href: "#",
      },
      {
        title: "Categories & Tags",
        href: "#",
      },
      {
        title: "Product Reviews",
        href: "#",
      },
    ],
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: LuClipboardList,
    subItems: [
      {
        title: "Order List",
        href: "/order-list",
      },
      {
        title: "Returns & Refunds",
        href: "#",
      },
      {
        title: "Shipping Tracking",
        href: "#",
      },
    ],
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: LuUsers,
    subItems: [
      {
        title: "Customer List",
        href: "/customer-list",
      },
      {
        title: "Customer Chats",
        href: "#",
      },
    ],
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: LuLayoutDashboard,
    subItems: [
      {
        title: "Banners",
        href: "#",
      },
    ],
  },
  {
    title: "Marketing",
    href: "/admin/marketing",
    icon: LuMegaphone,
    subItems: [
      {
        title: "Discounts & Coupons",
        href: "#",
      },
      {
        title: "Email Campaigns",
        href: "#",
      },
    ],
  },
  {
    title: "Analytics",
    href: "/admin/Analytics",
    icon: LuChartLine,
    subItems: [
      {
        title: "Sales Reports",
        href: "#",
      },
      {
        title: "Customer Insights",
        href: "#",
      },
      {
        title: "Product Performance",
        href: "#",
      },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: LuSettings,
    subItems: [
      {
        title: "Store Settings",
        href: "#",
      },
      {
        title: "Admin Users",
        href: "#",
      },
    ],
  },
];
