import React, { FC, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface IScrollToTopProps {
  children: React.ReactNode;
}

export const ScrollToTop: FC<IScrollToTopProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [location]);
  return <>{children}</>;
};
