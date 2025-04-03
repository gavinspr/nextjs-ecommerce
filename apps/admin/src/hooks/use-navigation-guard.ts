import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UseNavigationGuardProps {
  isDirty: boolean;
}

export function useNavigationGuard({ isDirty }: UseNavigationGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Handle browser-level navigation attempts
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Handle client-side navigation attempts
  useEffect(() => {
    const handleNavigation = (e: MouseEvent) => {
      if (isDirty) return;

      // Check if the click is on an anchor tag
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");
        if (href && href.startsWith("/") && href !== pathname) {
          e.preventDefault();
          if (confirm()) {
            router.push(href);
          }
        }
      }
    };

    document.addEventListener("click", handleNavigation);
    return () => document.removeEventListener("click", handleNavigation);
  }, [isDirty, pathname, router]);
}
