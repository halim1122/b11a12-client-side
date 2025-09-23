import { useEffect } from "react";
import { useLocation } from "react-router"; // অথবা next/navigation

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); // smooth or instant
  }, [pathname]);

  return null;
}

export default ScrollToTop;
