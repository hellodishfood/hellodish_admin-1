
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { baseurl } from '../../Utilities/Api';
import { useLocation } from 'react-router-dom';

function Reportdetail() {
  const location = useLocation();
  const { id } = location.state || {};
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState({}); 

  useEffect(() => {
    if (startDate && endDate) { 
      fetchData();
    }
  }, [startDate, endDate]);

  const token = "your-token-here";
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  const adjustDateToLocalTimezone = (date) => {
    const offsetInMinutes = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offsetInMinutes * 60000);
    return adjustedDate.toISOString().split('T')[0];
  };

  async function fetchData() {
    const formattedStartDate = adjustDateToLocalTimezone(startDate);
    const formattedEndDate = adjustDateToLocalTimezone(endDate);
    const url = `${baseurl}customer/api/PaymentDetailsByRestaurantId/${id}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    console.log(url,"urlurl");
    const response = await fetch(url, requestOptions);

    if (response.ok) {
      const responseData = await response.json();
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
        <div className="form-group" style={{ marginLeft: "20%" }}>
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
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Restaurant Price</th>
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
