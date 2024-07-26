import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Screens/Home";
import Restaurant from "./Screens/Restaurant";
import RestaurantDetails from "./Screens/RestaurantDetails";
import Menu from "./Screens/Menu";
import MyComponent from "./Screens/Users";
import Report from "./Screens/Report";
import Reportrestront from "./Screens/Reportrestront";
import Reportdetail from "./Screens/Reportdetail";
import Driver from "./Screens/Driver";
import DriverDetails from "./Screens/DriverDetails";
import Login from "./Screens/Login";
import DriverAnalytics from "./Screens/DriverAnalytics";
import Driverpayment from "./Screens/DriverPayment";
import OrderList from "./Screens/Orders";
import RestaurantOrders from "./Screens/RestaurantOrders";
import OrderDetail from "./Screens/OrdersDetails";
import BannersPromotions from "./Screens/Banners&Promotions";
import Dashboard from "./Screens/Dashboard";
import Reports from "./Screens/Reports";
import UserOrders from "./Screens/UserOrders";
import Restrontpolicy from "./Screens/Restrontpolicy";
import Userorder from "./Screens/Userorder";
import Pickupdeleary from "./Screens/Pickupdeleary";
import PrivacyPolicy from "./Screens/Privicy";

function Stack() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Restaurant" element={<Restaurant />} />
        <Route path="/RestaurantDetails" element={<RestaurantDetails />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/Reportrestront/:id" element={<Reportrestront />} />
        <Route path="/Reportdetail/:id"  element={<Reportdetail />} />
        <Route path="/Driver" element={<Driver />} />
        <Route path="/DriverDetails" element={<DriverDetails />} />
        <Route path="/" element={<PrivacyPolicy />} />
        <Route path="/" element={<Pickupdeleary />} />
        <Route path="/" element={<Restrontpolicy />} />
        <Route path="/DriverAnalytics" element={<DriverAnalytics />} />
        <Route path="/DriverPayment" element={<Driverpayment />} />
        <Route path="/RestaurantOrders" element={<RestaurantOrders />} />
        <Route path="/OrderDetail" element={<OrderDetail />} />
        <Route path="/BannersPromotions" element={<BannersPromotions />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/" element={<Userorder />} />

        <Route path="/Users" element={<MyComponent />} />
        <Route path="/UserOrders" element={<UserOrders />} />
        <Route path="/Orders" element={<OrderList />} />
        <Route path="/Reports" element={<Reports />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Stack;
