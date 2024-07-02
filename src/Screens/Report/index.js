import React, { useState, useEffect } from 'react';
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { baseurl } from '../../Utilities/Api';
import * as XLSX from "xlsx"


function Report() {
  const [selectedOption, setSelectedOption] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);

      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI';

      const myHeaders = new Headers();

      myHeaders.append("Authorization", `Bearer ${token}`);


      let url = '';

      if (selectedOption === 'users') {

        url = `${baseurl}driver/api/driverlist`;

      } else if (selectedOption === 'restaurants') {

        url = `${baseurl}restaurant/api/restaurantlist`;

      }


      const requestOptions = {

        method: 'GET',

        headers: myHeaders,

        redirect: 'follow',

      };


      try {

        const response = await fetch(url, requestOptions);


        if (!response.ok) {

          throw new Error(`HTTP error! status: ${response.status}`);

        }


        const result = await response.json();


        console.log('Response:', response);

        console.log('Result:', result);
        if (selectedOption === 'users') {
          setData(result.drivers || []);
        } else {
          setData(result.restaurants || []);
        }



        setError(null);

      } catch (error) {

        console.error('Error fetching data:', error);

        setError(error);

      } finally {

        setLoading(false);

      }

    };


    fetchData();

  }, [selectedOption]);

  // const convertToCSV = (data) => {
  //   // Implementation of the convertToCSV function
  //   // Convert data array to CSV string
  //   const csvRows = [];
  //   const headers = Object.keys(data[0]);
  //   csvRows.push(headers.join(','));
  
  //   for (const row of data) {
  //     const values = headers.map(header => row[header]);
  //     csvRows.push(values.join(','));
  //   }
  
  //   return csvRows.join('\n');
  // };
  const columnOrder = [
    "No",
    "ownerName",
    "restaurantName",
    "restaurantAddress",
    "phone",
    // "totalAmount",
    // "gstCharge",
    // "deliveryCharge",
    // "adminCommission",

  ];

  const columnOrder1 = [
    "name",
    "Phone",
    "Email",
    // "totalAmount",
    // "gstCharge",
    // "deliveryCharge",
    // "adminCommission",
  ]




  const downloadCSV = () => {
    
    const jsonDataWithNo = data.map((item, index) => ({
      No: index + 1, 
      ...item,
    }));
var newjsondata = []
jsonDataWithNo.forEach(element => {
      element['address'] = element.buildingNumber;
      newjsondata.push(element)
    });

    const ws = XLSX.utils.json_to_sheet(newjsondata, {
      header: selectedOption === 'users' ? columnOrder1 :  columnOrder,
    });
  
  
 
    const csv = XLSX.utils.sheet_to_csv(ws, {
      header: selectedOption === 'users' ? columnOrder1 :columnOrder,
    });
  
    // Create a blob from the CSV and download it
    const blob = new Blob([csv], { type: "text/csv" }); 
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  
  // const downloadCSV = () => {
  //   const csvData = new Blob([convertToCSV(data)], { type: 'text/csv' });
  //   const csvURL = URL.createObjectURL(csvData);
  //   const link = document.createElement('a');
  //   link.href = csvURL;
  //   link.download = `report.csv`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  return (
    <>
      <NavHeader />
      <Slidebar />
      <div id="main-wrapper">
        <div className="content-body">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-body">
      {/* <button onClick={downloadCSV} style={{height:"40px",width:"70px", backgroundColor:"red"}}>download</button> */}
      <button onClick={downloadCSV} style={{marginLeft:"90%"}} type="button" class="btn btn-primary mt-0 me-3"  data-bs-dismiss="modal" >Download</button>

                    <h4 className="card-title">Report</h4>
                    <div className="form-group">
                      <label htmlFor="selectOption">Select Option</label>
                      <select
                        id="selectOption"
                        className="form-control"
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <option value="users">Users</option>
                        <option value="restaurants">Restaurants</option>
                      </select>
                    </div>

                    {loading ? (
                      <div>Loading...</div>
                    ) : (
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            {selectedOption === 'users' ? (
                              <>
                                <th>No</th>
                                <th>Name</th>
                                <th>Email</th>
                                {/* <th>Total Amount</th>
                                <th>Gst Charge</th>
                                <th>Delivery Charge</th>
                                <th>Admin Commission</th> */}
                                {/* <th>Actions</th> */}
                              </>
                            ) : (
                              <>
                                <th>No</th>
                                <th>Owner Name</th>
                                <th>Restaurant Name</th>
                                <th>Restaurant Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                {/* <th>Total Amount</th>
                                <th>Gst Charge</th>
                                <th>Delivery Charge</th>
                                <th>Admin Commission</th> */}
                               
                              </>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              {selectedOption === 'users' ? (
                                <>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                  {/* <td>
                                    <button className="btn btn-primary">View</button>
                                  </td> */}
                                </>
                              ) : (
                                <>
                                  <td>{item.ownerName}</td>
                                  <td>{item.restaurantName}</td>
                                  <td>{item.restaurantAddress}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phone}</td>
                                </>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {error && (
                      <div style={{ color: 'red' }}>{error.message}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
