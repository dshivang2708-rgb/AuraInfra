import { useEffect } from "react";

/**
 * TanStack Router only resets scroll on an actual navigation (a different
 * pathname/search/hash). Clicking a <Link> that points at the page you're
 * already on doesn't trigger a navigation at all, so the scroll position
 * never moves — e.g. clicking "Residential" in the footer while already on
 * the Residential page. This listens for clicks on any internal link and,
 * if it points at the current page, scrolls the window to the top itself.
 */
export default function ScrollToTopOnSameLink() {
  useEffect(() => {
    const handleClick = (e) => {
      // Ignore modified clicks (new tab / new window) and non-primary buttons.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = e.target.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }

      // Only internal links to this same origin.
      if (url.origin !== window.location.origin) return;

      // A link to a different page or a same-page hash anchor should be
      // left alone — only handle "this exact page, no hash" links.
      if (url.pathname !== window.location.pathname) return;
      if (url.hash) return;

      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}