// import React, { useState, useEffect } from 'react';
// import Slidebar from "../Slidebar";
// import NavHeader from "../NavHeader";
// import { baseurl } from '../../Utilities/Api';
// import { Link } from "react-router-dom";

// import * as XLSX from "xlsx";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { useNavigate } from "react-router-dom";
// import { useLocation ,useParams} from 'react-router-dom';
// function Report() {
//   const { _id } = useParams();
//   const location = useLocation();
//   // const { data } = location.state;
//   const navigate = useNavigate();
//   const [selectedOption, setSelectedOption] = useState('users');
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();

//   const handleOptionChange = (e) => {
//     setSelectedOption(e.target.value);
//   };

//   // const handleRedireact1 = (e,id) => {
//   //   console.log("_Id",id);
//   //   e.preventDefault();
//   //   navigate(`/Reportrestront#/Reportrestront/${id}`)
//   // }

//   // const handleRedireact = (e,id) => {
//   //   console.log("_Id",id);
//   //   e.preventDefault();
//   //   navigate(`/Reportdetail#/Reportdetail/${id}`)
//   // }
 
 
//   const fetchData = async () => {
//     setLoading(true);
//     const token = 'your-token-here';
//     const myHeaders = new Headers();
//     myHeaders.append("Authorization", `Bearer ${token}`);

//     let url = '';
//     if (selectedOption === 'users') {
//       if (startDate && endDate) {
//         const formattedStartDate = startDate.toISOString().split('T')[0];
//         const formattedEndDate = endDate.toISOString().split('T')[0];
//         // url = `${baseurl}PaymentDetailsByUserId/66479bd9b30d627df5773ace?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
//       } else {
//         url = `${baseurl}driver/api/driverlist`;
//       }
//     } else if (selectedOption === 'restaurants') {
//       if (startDate && endDate) {
//         const formattedStartDate = startDate.toISOString().split('T')[0];
//         const formattedEndDate = endDate.toISOString().split('T')[0];
//         // url = `${baseurl}PaymentDetailsByRestaurantId/6662ae17320305ee67f8408f?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
//       } else {
//         url = `${baseurl}restaurant/api/restaurantlist`;
//       }
//     }

//     const requestOptions = {
//       method: 'GET',
//       headers: myHeaders,
//       redirect: 'follow',
//     };

//     try {
//       const response = await fetch(url, requestOptions);
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       const result = await response.json();
//       setData(selectedOption === 'users' ? result.drivers || [] : result.restaurants || []);
//       setError(null);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if ((selectedOption === 'users' && startDate && endDate) || (selectedOption === 'restaurants' && startDate && endDate) || selectedOption !== 'users') {
//       fetchData();
//     }
//   }, [selectedOption, startDate, endDate]);

//   const columnOrder = ["No", "ownerName", "restaurantName", "restaurantAddress", "phone"];
//   const columnOrder1 = ["name", "Phone", "Email"];

//   const downloadCSV = () => {
//     const jsonDataWithNo = data.map((item, index) => ({
//       No: index + 1, 
//       ...item,
//     }));
//     const newJsonData = jsonDataWithNo.map(item => ({
//       ...item,
//       address: item.buildingNumber,
//     }));

//     const ws = XLSX.utils.json_to_sheet(newJsonData, {
//       header: selectedOption === 'users' ? columnOrder1 : columnOrder,
//     });

//     const csv = XLSX.utils.sheet_to_csv(ws, {
//       header: selectedOption === 'users' ? columnOrder1 : columnOrder,
//     });

//     const blob = new Blob([csv], { type: "text/csv" }); 
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `report.csv`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   return (
//     <>
//       <NavHeader />
//       <Slidebar />
//       <div id="main-wrapper">
//         <div className="content-body">
//           <div className="container-fluid">
//             <div className="row">
//               <div className="col-lg-12">
//                 <div className="card">
//                   <div className="card-body">
//                     <button onClick={downloadCSV} style={{marginLeft:"90%"}} type="button" className="btn btn-primary mt-0 me-3">Download</button>
//                     <h4 className="card-title">Report</h4>
//                     <div className="form-group">
//                       <label htmlFor="selectOption">Select Option</label>
//                       <select
//                         id="selectOption"
//                         className="form-control"
//                         value={selectedOption}
//                         onChange={handleOptionChange}
//                       >
//                         <option value="users">Driver</option>
//                         <option value="restaurants">Restaurants</option>
//                       </select>
//                     </div>
// {/* 
//                     {selectedOption === 'users' && (
//                       <div className="form-group">
//                         <label>Select Start Date</label>
//                         <DatePicker
//                           selected={startDate}
//                           onChange={(date) => setStartDate(date)}
//                           selectsStart
//                           startDate={startDate}
//                           endDate={endDate}
//                           className="form-control"
//                         />
//                         <label>Select End Date</label>
//                         <DatePicker
//                           selected={endDate}
//                           onChange={(date) => setEndDate(date)}
//                           selectsEnd
//                           startDate={startDate}
//                           endDate={endDate}
//                           minDate={startDate}
//                           className="form-control"
//                         />
//                       </div>
//                     )}

//                     {selectedOption === 'restaurants' && (
//                       <div className="form-group">
//                         <label>Select Start Date</label>
//                         <DatePicker
//                           selected={startDate}
//                           onChange={(date) => setStartDate(date)}
//                           selectsStart
//                           startDate={startDate}
//                           endDate={endDate}
//                           className="form-control"
//                         />
//                         <label>Select End Date</label>
//                         <DatePicker
//                           selected={endDate}
//                           onChange={(date) => setEndDate(date)}
//                           selectsEnd
//                           startDate={startDate}
//                           endDate={endDate}
//                           minDate={startDate}
//                           className="form-control"
//                         />
//                       </div>
//                     )} */}

//                     {loading ? (
//                       <div>Loading...</div>
//                     ) : (
//                       <table className="table table-bordered">
//                         <thead>
//                           <tr>
//                             {selectedOption === 'users' ? (
//                               <>
//                                 <th>No</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                                 <th>view</th>
//                               </>
//                             ) : (
//                               <>
//                                 <th>No</th>
//                                 <th>Owner Name</th>
//                                 <th>Restaurant Name</th>
//                                 <th>Restaurant Address</th>
//                                 <th>Email</th>
//                                 <th>Phone</th>
//                                 <th>view</th>
//                               </>
//                             )}
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {data.map((item, index) => (
//                             <tr key={index}>
//                               <td>{index + 1}</td>
//                               {selectedOption === 'users' ? (
//                                 <>
//                                   <td>{item.name}</td>
//                                   <td>{item.email}</td>
//                                   {/* <td>
//   <button
//     className="btn btn-primary"
//     onClick={(e) => handleRedireact1(e, item._id)}
//   >
//     <i className="fas fa-eye" /> 
//   </button>
// </td> */}
// <Link
//                                 to="/Reportrestront"
//                                 // to={`/Reportrestront/${item._id}`}
//                                 className="btn main_btn"
//                                 state={{ data: item }}
//                               >
//                                  <button
//     className="btn "
//     // onClick={(e) => handleRedireact1(e, item._id)}
//   >
//     <i className="fas fa-eye" /> 
//   </button>
//                         {/* <i className="fas fa-eye" />  */}
//                               </Link>

//                                 </>
//                               ) : (
//                                 <>
//                                   <td>{item.ownerName}</td>
//                                   <td>{item.restaurantName}</td>
//                                   <td>{item.restaurantAddress}</td>
//                                   <td>{item.email}</td>
//                                   <td>{item.phone}</td>
//                                   {/* <td onClick={(e)=>handleRedireact(e,item._id)}> button</td> */}
//                                   <td>
//   {/* <button
//     className="btn btn-primary"
//     onClick={(e) => handleRedireact(e, item._id)}
//   >
//     <i className="fas fa-eye" /> 
//   </button> */}
// <Link
//   to="/Reportdetail"
//   // to={`/Reportdetail/${item._id}`}
//   className="btn main_btn"
//   state={{ data: item }}
// >
//   <button
//     className="btn  btn-sm"
   
//   >
// <i style={{ borderWidth: '1px' }} className="fas fa-eye" />
//   </button>
// </Link>

// </td>
//                                 </>
//                               )}
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     )}

//                     {error && (
//                       <div style={{ color: 'red' }}>{error.message}</div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );

// }


// export default Report;

import React, { useState, useEffect } from 'react';
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { baseurl } from '../../Utilities/Api';
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from 'react-router-dom';

function Report() {
  const { _id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetchData = async () => {
    setLoading(true);
    const token = 'your-token-here';
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
      setData(selectedOption === 'users' ? result.drivers || [] : result.restaurants || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const columnOrder = ["No", "ownerName", "restaurantName", "restaurantAddress", "phone"];
  const columnOrder1 = ["name", "Phone", "Email"];

  const downloadCSV = () => {
    const jsonDataWithNo = data.map((item, index) => ({
      No: index + 1,
      ...item,
    }));
    const newJsonData = jsonDataWithNo.map(item => ({
      ...item,
      address: item.buildingNumber,
    }));

    const ws = XLSX.utils.json_to_sheet(newJsonData, {
      header: selectedOption === 'users' ? columnOrder1 : columnOrder,
    });

    const csv = XLSX.utils.sheet_to_csv(ws, {
      header: selectedOption === 'users' ? columnOrder1 : columnOrder,
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
                    <button onClick={downloadCSV} style={{ marginLeft: "90%" }} type="button" className="btn btn-primary mt-0 me-3">Download</button>
                    <h4 className="card-title">Report</h4>
                    <div className="form-group">
                      <label htmlFor="selectOption">Select Option</label>
                      <select
                        id="selectOption"
                        className="form-control"
                        value={selectedOption}
                        onChange={handleOptionChange}
                      >
                        <option value="users">Driver</option>
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
                                <th>view</th>
                              </>
                            ) : (
                              <>
                                <th>No</th>
                                <th>Owner Name</th>
                                <th>Restaurant Name</th>
                                <th>Restaurant Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>view</th>
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
                                  <td>
                                    <Link
                                      to={`/Reportrestront`}
                                      className="btn main_btn"
                                      state={{ data: item, id: item._id }}
                                    >
                                      <button className="btn">
                                        <i className="fas fa-eye" />
                                      </button>
                                    </Link>
                                  </td>
                                </>
                              ) : (
                                <>
                                  <td>{item.ownerName}</td>
                                  <td>{item.restaurantName}</td>
                                  <td>{item.restaurantAddress}</td>
                                  <td>{item.email}</td>
                                  <td>{item.phone}</td>
                                  <td>
                                    <Link
                                      to={`/Reportdetail`}
                                      className="btn main_btn"
                                      state={{ data: item, id: item._id }}

                                    >
                                      <button className="btn btn-sm">
                                        <i style={{ borderWidth: '1px' }} className="fas fa-eye" />
                                      </button>
                                    </Link>
                                  </td>
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
