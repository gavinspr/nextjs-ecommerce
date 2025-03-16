import { LuBell, LuClock } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NotificationBadge } from "../NotificationBadge";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// temp
const notifications = [
  {
    id: 1,
    title: "Your order #DRV-2849 is placed",
    description:
      "Your package containing 3 items has been processed and will be shipped via FedEx Ground. Expected delivery date: Friday, March 24th. Tracking number: 926129010285634100025489. You can monitor progress through our app or website.",
    time: "2 days ago",
    avatar: "/avatars/1.png",
    unread: false,
  },
  {
    id: 2,
    title: "Congratulations Darlene 🎉 Top Seller!",
    description:
      "You've achieved Platinum Seller status this month with $42,850 in total sales - that's 147% above your quarterly goal! Your reward: Featured storefront placement and increased commission rates through next month.",
    time: "11 am",
    avatar: "/avatars/2.png",
    unread: true,
  },
  {
    id: 3,
    title: "Joaquina Weisenborn - Project Update",
    description:
      "The UX team has completed phase 3 of the mobile app redesign. Please review the Figma prototypes (v2.8.3) and provide feedback by EOD Friday. Key changes: Updated checkout flow, new AR preview feature, and dark mode enhancements.",
    time: "12 pm",
    avatar: "/avatars/3.png",
    unread: true,
  },
  {
    id: 4,
    title: "Brooklyn Simmons - Access Granted",
    description:
      "You've been added to 'Project Phoenix' team with Editor permissions. Repository: phoenix-mobile-app (branch: staging). First task: Review PR #2847 (Navigation refactor) by 3pm PST today. Use 2FA when committing changes.",
    time: "1 pm",
    avatar: "/avatars/4.png",
    unread: true,
  },
  {
    id: 5,
    title: "Margot Henschke - Security Alert",
    description:
      "Unusual login attempt detected from IP 196.168.23.45 (São Paulo, Brazil) at 2:15 AM PST. If this wasn't you, please reset your password immediately and enable 2-factor authentication in account settings.",
    time: "3 pm",
    avatar: "/avatars/5.png",
    unread: false,
  },
  {
    id: 6,
    title: "Sal Piggee - System Maintenance",
    description:
      "Scheduled downtime: March 23rd 1:00-4:00 AM PST for database migration. APIs will return 503 errors during this window. Ensure all critical jobs complete before maintenance window. Post-migration checklist required.",
    time: "4 pm",
    avatar: "/avatars/6.png",
    unread: false,
  },
  {
    id: 7,
    title: "Miguel Guelff - Payment Processed",
    description:
      "Invoice #INV-2847 for $8,450.00 has been paid via ACH transfer (Confirmation: XH284GZ9). Funds will clear in 2-3 business days. Download receipt: https://billing.example.com/receipts/XH284GZ9",
    time: "7 pm",
    avatar: "/avatars/7.png",
    unread: true,
  },
  {
    id: 8,
    title: "Mauro Elenbaas - New Message",
    description:
      "Team: Reminder about Q2 OKRs - final submissions due Friday. Template: drive > 2024 > Q2_OKRS > YOUR_NAME.docx. Need help? Book office hours with Mauro (Calendly link in profile).",
    time: "10 pm",
    avatar: "/avatars/8.png",
    unread: true,
  },
  {
    id: 9,
    title: "Bridgett Omohundro - Event Reminder",
    description:
      "You're registered for 'Advanced React Patterns' workshop tomorrow at 2pm PST (Zoom link: https://zoom.us/j/2849572845?pwd=QmZ1U0VY...). Prep: Install Node 18.x, clone repo: git@github.com:react-workshop/2024-03.git",
    time: "10 pm",
    avatar: "/avatars/9.png",
    unread: false,
  },
  {
    id: 10,
    title: "Zenia Jacobs - Policy Update",
    description:
      "New remote work policy effective April 1st: Core hours 10am-2pm PST, mandatory bi-weekly team syncs, $500 home office stipend available (submit by 3/25). Full details: drive > policies > 2024_WFH_Guidelines.pdf",
    time: "10 am",
    avatar: "/avatars/10.png",
    unread: false,
  },
];
// todo: handle view all
// todo: handle notification click
// ? todo: merge with NavMessages after plugging in real data

export const NavNotifications = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="[&_svg:not([class*='size-'])]:size-5"
      >
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <LuBell className="animate-tada" />
          <NotificationBadge value={2} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[8rem] max-w-[90vw] lg:w-80 p-0"
        align="end"
      >
        <div className="flex justify-between border-b px-6 py-4 items-center">
          <div className="font-medium">Notifications</div>
          <Link
            href="#"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
        <ScrollArea className="h-[300px] xl:h-[350px]">
          <div className="space-y-2 p-2">
            {notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className="group items-start flex cursor-pointer gap-3 rounded-sm px-4 py-2 focus:bg-accent [&_svg:not([class*='size-'])]:size-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar-temp.png" />
                  <AvatarFallback>{"GS"}</AvatarFallback>
                </Avatar>
                <div className="flex-5/6 min-w-0 space-y-1">
                  <div className="line-clamp-1 text-sm font-medium">
                    {notification.title}
                  </div>
                  <div className="line-clamp-1 text-xs font-light">
                    {notification.description}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <LuClock className="mt-[1px]" />
                    {notification.time}
                  </div>
                </div>
                <div className="flex flex-1/6 self-center">
                  {notification.unread && (
                    <span className="h-2 w-2 rounded-full bg-destructive" />
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
