import { LuClock, LuMessageSquareText } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NotificationBadge } from "../NotificationBadge";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// temp
const messages = [
  {
    id: 1,
    name: "Wade Warren",
    preview:
      "Hey, just wanted to follow up on the client proposal from last week. Did you get a chance to review those design mockups I sent over? We need to finalize this by Friday at the latest...",
    time: "11:34 am",
    initials: "W",
    unread: true,
  },
  {
    id: 2,
    name: "Savannah Nguyen",
    preview:
      "About tomorrow's meeting agenda - I think we should prioritize discussing the Q3 budget allocations first, especially considering the new project requirements from the stakeholders...",
    time: "10:15 am",
    initials: "S",
    unread: false,
  },
  {
    id: 3,
    name: "Ralph Edwards",
    preview:
      "Quick question about the onboarding process for new team members. Should we schedule the orientation sessions before or after the department-wide all-hands meeting next week? Let me know...",
    time: "9:02 am",
    initials: "R",
    unread: true,
  },
  {
    id: 4,
    name: "Cody Fisher",
    preview:
      "I'm working on the quarterly report and noticed some discrepancies in the sales figures from April. Can you double-check the numbers in tab 3 of the shared spreadsheet when you get a chance?",
    time: "Yesterday",
    initials: "C",
    unread: true,
  },
  {
    id: 5,
    name: "Eleanor Pena",
    preview:
      "The UX team mentioned they need feedback on the latest wireframes by EOD today. Are you available for a quick sync call around 2 PM to go through the mobile app flow together?",
    time: "2 days ago",
    initials: "E",
    unread: false,
  },
  {
    id: 6,
    name: "Devon Lane",
    preview:
      "Regarding the conference logistics - the hotel finally got back to me with updated room rates. We'll need to confirm our group booking by Wednesday to lock in the discounted rates...",
    time: "Wednesday",
    initials: "D",
    unread: true,
  },
  {
    id: 7,
    name: "Beatrice Russo",
    preview:
      "Security update: Please remember to reset your passwords following the new IT policy requirements. The deadline is Friday, and here's the link to the portal: https://company-portal/update-password",
    time: "Monday",
    initials: "B",
    unread: false,
  },
  {
    id: 8,
    name: "Theodore Miles",
    preview:
      "Team lunch this Friday! We're trying to decide between Italian or Mexican. Let me know if you have any dietary restrictions or preferences we should consider for the reservation...",
    time: "Last week",
    initials: "T",
    unread: true,
  },
  {
    id: 9,
    name: "Penelope Cruz",
    preview:
      "I just came across this interesting article about emerging market trends in our industry. Thought you might find it relevant for the strategic planning session next month...",
    time: "Mar 15",
    initials: "P",
    unread: false,
  },
  {
    id: 10,
    name: "Harrison Wells",
    preview:
      "Reminder: The project deadline has been moved up to next Wednesday. Let's touch base Monday morning to review remaining tasks and allocate resources accordingly...",
    time: "Mar 14",
    initials: "H",
    unread: true,
  },
];
// todo: handle view all
// todo: handle message click
// ? todo: merge with NavNotifications after plugging in real data

export const NavMessages = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <LuMessageSquareText size={20} />
          <NotificationBadge value={4} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="min-w-[8rem] max-w-[90vw] lg:w-80 p-0"
        align="end"
      >
        <div className="flex justify-between border-b px-6 py-4 items-center">
          <div className="font-medium">Messages</div>
          <Link
            href="#"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            View all
          </Link>
        </div>
        <ScrollArea className="h-[300px] xl:h-[350px]">
          <div className="space-y-2 p-2">
            {messages.map((message) => (
              <DropdownMenuItem
                key={message.id}
                className="group flex item-start cursor-pointer gap-3 rounded-sm px-4 py-2 focus:bg-accent [&_svg:not([class*='size-'])]:size-3"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/" />
                  <AvatarFallback>{"GS"}</AvatarFallback>
                </Avatar>
                <div className="flex-5/6 min-w-0 space-y-1">
                  <div className="line-clamp-1 text-sm font-medium">
                    {message.name}
                  </div>
                  <div className="line-clamp-1 text-xs font-light">
                    {message.preview}
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <LuClock className="mt-[1px]" />
                    {message.time}
                  </div>
                </div>
                <div className="flex flex-1/6 self-center">
                  {message.unread && (
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
