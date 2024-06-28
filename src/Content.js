import { Routes, Route, Navigate, json } from "react-router-dom";
import routes from "./app-routes";
import { useEffect } from "react";
// import { SideNavOuterToolbar as SideNavBarLayout } from './layouts';
// import { Footer } from './components';

function Content() {
  const cr = localStorage.getItem("stab");
  console.log("crrrr", cr);
  return (
    // <SideNavBarLayout>
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to={`/${cr}`} />} />
      {/* <Route path="*" element={<Navigate to="/Dashboard" />} /> */}
    </Routes>

    // </SideNavBarLayout>
  );
}

export default Content;
