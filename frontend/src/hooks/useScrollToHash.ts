import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }

    const targetId = hash.slice(1);
    
    // Retry finding element briefly if content renders asynchronously
    const attemptScroll = () => {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (!attemptScroll()) {
      const observer = new MutationObserver(() => {
        if (attemptScroll()) observer.disconnect();
      });

      observer.observe(document.body, { childList: true, subtree: true });
      const timer = setTimeout(() => observer.disconnect(), 1000);

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    }
  }, [pathname, hash]);
}