import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { withNavigationWatcher } from "./contexts/navigation";
import Home from "./Screens/Home";
import Restaurant from "./Screens/Restaurant";

import RestaurantDetails from "./Screens/RestaurantDetails";
import Menu from "./Screens/Menu";
import Report from "./Screens/Report";
import Driver from "./Screens/Driver";
import DriverDetails from "./Screens/DriverDetails";
import DriverAnalytics from "./Screens/DriverAnalytics";
import DriverFoodOrders from "./Screens/DriverFoodOrders";
import Driverpayment from "./Screens/DriverPayment";
import RestaurantOrders from "./Screens/RestaurantOrders";
import RestaurantFoodMenu from "./Screens/RestaurantFoodMenu";
import RestaurantPayment from "./Screens/RestaurantPayment";
import RestaurantAnalytics from "./Screens/RestaurantAnalytics";
import OrderList from "./Screens/Orders";
import OrdersDetails from "./Screens/OrdersDetails";
import MyComponent from "./Screens/Users";
import UserOrders from "./Screens/UserOrders";
import BannersPromotions from "./Screens/Banners&Promotions";
import Dashboard from "./Screens/Dashboard";
import Reports from "./Screens/Reports";
import UserPayment from "./Screens/UserPayments";
import UserAnalytics from "./Screens/UserAnalytics";
import PolicySupport from "./Screens/PolicySupport";
import Chat from "./Screens/Chat";
import AddRes from "./Screens/AddRes";
import Profile from "./Screens/Profile";

const routes = [
  // {
  //     path: '/Home',
  //     element: Home
  // },
  {
    path: "/Dashboard",
    element: Dashboard,
  },
  {
    path: "/Reports",
    element: Reports,
  },
  {
    path: "/Banner-promotions",
    element: BannersPromotions,
  },
  {
    path: "/Restaurant",
    element: Restaurant,
  },
 
  {
    path: "/RestaurantDetails",
    element: RestaurantDetails,
  },
  {
    path: "/Menu",
    element: Menu,
  },
  {
    path: "/Orders",
    element: OrderList,
  },
  {
    path: "/OrderDetails",
    element: OrdersDetails,
  },
  {
    path: "/Users",
    element: MyComponent,
  },

  {
    path: "/Driver",
    element: Driver,
  },
  {
    path: "/Report",
    element: Report,
  },
  {
    path: "/DriverDetails",
    element: DriverDetails,
  },
  {
    path: "/DriverAnalytics",
    element: DriverAnalytics,
  },
  {
    path: "/DriverFoodOrders",
    element: DriverFoodOrders,
  },
  {
    path: "/DriverPayment",
    element: Driverpayment,
  },
  {
    path: "/RestaurantOrders",
    element: RestaurantOrders,
  },
  {
    path: "/RestaurantPayment",
    element: RestaurantPayment,
  },
  {
    path: "/RestaurantFoodMenu",
    element: RestaurantFoodMenu,
  },
  {
    path: "/UserOrders",
    element: UserOrders,
  },
  {
    path: "/UserPayment",
    element: UserPayment,
  },
  {
    path: "/UserAnalytics",
    element: UserAnalytics,
  },
  {
    path: "/RestaurantAnalytics",
    element: RestaurantAnalytics,
  },
  {
    path: "/PolicySupport",
    element: PolicySupport,
  },
  {
    path: "/Chat",
    element: Chat,
  },
  {
    path: "/AddRestaurant",
    element: AddRes,
  },
  {
    path: "/Profile",
    element: Profile,
  },

];

export default routes.map((route) => {
  return {
    ...route,
    element: withNavigationWatcher(route.element, route.path),
  };
});
