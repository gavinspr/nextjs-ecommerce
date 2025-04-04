import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

interface UseNavigationGuardProps {
  isDirty: boolean;
  message?: string;
}

export function useNavigationGuard({
  isDirty,
  message = "You have unsaved changes. Are you sure you want to leave?",
}: UseNavigationGuardProps) {
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
  }, [isDirty, message]);

  // Handle client-side navigation attempts
  useEffect(() => {
    const handleNavigation = (e: MouseEvent) => {
      if (!isDirty) return;

      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor) {
        const href = anchor.getAttribute("href");

        if (href && href.startsWith("/") && href !== pathname) {
          e.preventDefault();
          e.stopPropagation();

          if (window.confirm(message)) {
            router.push(href);
          }
        }
      }
    };

    document.addEventListener("click", handleNavigation, true);
    return () => document.removeEventListener("click", handleNavigation, true);
  }, [isDirty, pathname, router, message]);
}
