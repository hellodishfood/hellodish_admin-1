import React, { useState, createContext, useContext, useEffect } from "react";

const NavigationContext = createContext({});
const useNavigation = () => useContext(NavigationContext);

function NavigationProvider(props) {
  const [navigationData, setNavigationData] = useState({ currentPath: "" });

  return (
    <NavigationContext.Provider
      value={{ navigationData, setNavigationData }}
      {...props}
    />
  );
}

function withNavigationWatcher(Component, path) {
  const WrappedComponent = function (props) {
    const { navigationData, setNavigationData } = useNavigation();

    useEffect(() => {
      setNavigationData({ currentPath: path });
    }, [setNavigationData]);
    localStorage.setItem("cr", navigationData.currentPath);
    return <Component {...props} />;
  };

  return <WrappedComponent />;
}

export { NavigationProvider, useNavigation, withNavigationWatcher };
