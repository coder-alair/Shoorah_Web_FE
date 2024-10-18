import { createContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useState } from "react";
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isShow, setShow] = useState(false);

  useEffect(() => {
    document?.documentElement?.scrollTo(0, 0);
    console.log("Scrolled");
  }, [window?.location?.pathname]);

  return (
    <SidebarContext.Provider value={{ isShow, setShow }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.any,
};
