import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { baseurl } from '../../Utilities/Api';

function Reportdetail() {
  const { _Id } = useParams(); // Ensure the parameter name matches the route setup
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState({
    restaurantPrice: 0,
    deliveryCharge: 0,
    adminCommission: 0,
    gstPackingCharge: 0,
    totalCost: 0
  }); // Initialize data state with default values

  useEffect(() => {
    if (startDate && endDate) { // Only fetch data when both start and end dates are selected
      fetchData();
    }
  }, [startDate, endDate]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  async function fetchData() {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    const url = `${baseurl}customer/api/PaymentDetailsByUserId/66854e5f3422402184d13f8f?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const responseData = await response.json();
      console.log("Fetched data:", responseData); 
      if (responseData.status) {
        setData(responseData.data); 
      } else {
        console.error("Fetch request failed:", responseData);
      }
    } else {
      console.error("Failed to fetch data");
    }
  }

  return (
    <>
    <NavHeader />
    <Slidebar />
    <div>
      <div className="form-group" style={{marginLeft:"20%"}}>
        <label>Select Start Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          className="form-control"
        />
        <label>Select End Date</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          className="form-control"
        />
      </div>

      {startDate && endDate && (
         <div className="card" style={{ width: "80%", marginLeft: "20%" }}>
    <div className="card-body">
    <table className="table table-bordered table-responsive">
          <thead>
            <tr>
              <th>Order Price</th>
              <th>Delivery Charge</th>
              <th>Admin Commission</th>
              <th>GST Packing Charge</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.restaurantPrice}</td>
              <td>{data.deliveryCharge}</td>
              <td>{data.adminCommission}</td>
              <td>{data.gstPackingCharge}</td>
              <td>{data.totalCost}</td>
            </tr>
          </tbody>
        </table>
        </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Reportdetail;
