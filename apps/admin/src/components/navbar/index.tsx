import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "./ModeToggle";
import { UserMenu } from "./UserMenu";
import { NavMessages } from "./NavMessages";
import { NavNotifications } from "./NavNotifications";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex h-16 w-full items-center px-4 md:px-6">
        <SidebarTrigger className="[&_svg:not([class*='size-'])]:size-5" />
        <div className="flex items-center gap-3 ml-auto">
          <NavMessages />
          <NavNotifications />
          <ModeToggle />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};
