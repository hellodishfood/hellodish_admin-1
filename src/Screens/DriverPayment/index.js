import React, { useEffect, useState } from "react";
import Driver from "../Driver";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";
import * as XLSX from "xlsx"
import { useRef, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import DatePicker from "react-datepicker";
import Html2Pdf from "js-html2pdf";


function Driverpayment() {
  const componentRef = useRef();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const location = useLocation();
  const data1 = location?.state?.data;
  const [data, setData] = useState([]);
  const [amt, setAmt] = useState("");
  const [wallet, setWallet] = useState([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [odata, setoData] = useState([]);
  const [load, setLoad] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [selectedOption, setSelectedOption] = useState('users');

  useEffect(() => {
    GetAllPayment();
  }, []);
  
  // const columnOrder1 = [
  //   "name",
  //   "Phone",
  //   "Email",
  // ]

  const columnOrder1 = [
    // "No",
    "orderID",
    // "transactionID",
    // "Food",
    "Amount",
    // "Status",
    // "Date & Time"

  ];
  const tableRef = useRef();

  const handlePrint = () => {
    const printContents = tableRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload(); // To reload the page after printing
  };
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   onPrintError: (error) => console.log(error),
  //   print: async (printIframe) => {
  //     console.log(printIframe);
  //     const document = printIframe.contentDocument;
  //     if (document) {
  //       const ticketElement = document.getElementsByClassName("ticket")[0];
  //       ticketElement.style.display = "block";
  //       const options = {
  //         margin: 0,
  //         filename: "ticket.pdf",
  //         jsPDF: { unit: "px", format: [600, 800], orientation: "portrait" },
  //       };
  //       const exporter = new Html2Pdf(ticketElement, options);
  //       await exporter.getPdf(options);
  //     }
  //   },
  // });
  const downloadCSV = () => {
    // Add "No" field to each item in jsonData
    const jsonDataWithNo = data.map((item, index) => (
      // console.log("itemitemitem",item),
      {
      // No: index + 1, // Adding 1 to make it 1-based index
      ...item,
    }));
    
    // Create a new array with the modified data
    const newjsondata = jsonDataWithNo.map(element => (
      {
      // ...element,
    orderID: element._id,
      Amount:element.amount,
      DateTime:element.createdAt,
    }));
  
    // Convert JSON data to worksheet with specified columns only
    const ws = XLSX.utils.json_to_sheet(newjsondata, {
      header: selectedOption === 'users' ? columnOrder1 : columnOrder1,
    });
  
    // Convert the worksheet to CSV
    const csv = XLSX.utils.sheet_to_csv(ws, {
      header: selectedOption === 'users' ? columnOrder1 : columnOrder1,
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
  
  const GetAllPayment = () => {
    setLoad(true);
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI"
    );
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `${baseurl}admin/api/getAllPayment/${data1?.driver?._id}/1`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        setData(result?.data);
        setoData(result?.data);
        setWallet(result?.wallet);

        console.log("result", result);
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const search = (val) => {
    if (val !== "") {
      const searchResult = odata.filter((item) =>
        item?._id.toLowerCase().includes(val.toLowerCase())
      );
      setCurrentpage(1);
      setData(searchResult);
    } else {
      setCurrentpage(1);
      setData(odata);
    }
  };

  function Add() {
    setLoad(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI"
    );

    const raw = JSON.stringify({
      type: "1",
      id: data1?.driver?._id,
      payment: Number(amt),
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/updateWallet`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status == true) {
          GetAllPayment();
          setAmt("");
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  return (
    <>
      {/********************
  Preloader start
    *********************/}
      <div id="preloader">
        <div className="gooey">
          <span className="dot" />
          <div className="dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      {/********************
  Preloader end
    *********************/}
      {/***********************************
  Main wrapper start
    ************************************/}
      <div id="main-wrapper">
        {/***********************************
      Nav header start
  ************************************/}
        <NavHeader />
        {/***********************************
      Nav header end
  ************************************/}
        {/***********************************
      Header start
  ************************************/}
        <div className="header">
          <div className="header-content">
            <nav className="navbar navbar-expand">
              <div className="collapse navbar-collapse justify-content-between">
                <div className="header-left">
                  <div className="nav-item">
                    <div className="d-flex align-items-center gap-3">
                      {data1?.driver?.profileImage !== "" ? (
                        <img
                          src={`${baseurl}${data1?.driver?.profileImage}`}
                          style={{ width: 60, height: 60, borderRadius: 13 }}
                        />
                      ) : (
                        <img
                          src="images/user.png"
                          style={{ width: 60, height: 60, borderRadius: 13 }}
                        />
                      )}

                      <h2 className="mb-0 me-auto">{data1?.driver?.name}</h2>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft:"700px"}}>
  <button
    type="button"
    className="btn btn-primary me-3"
    data-bs-dismiss="modal"
    onClick={handlePrint}
  >
    Print
  </button>
  <button
    type="button"
    className="btn btn-primary ml-2"
    data-bs-dismiss="modal"
    onClick={downloadCSV}
  >
    Download
  </button>
</div>
                </div>
                <ul className="navbar-nav header-right"></ul>
              </div>
            </nav>
          </div>
        </div>
        {/***********************************
      Header end ti-comment-alt
  ************************************/}
        {/***********************************
      Sidebar start
  ************************************/}
        <Slidebar />
        {/***********************************
      Sidebar end
  ************************************/}
        {/***********************************
      Content body start
  ************************************/}
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="mb-4 row align-items-center">
              <div className="col-lg-5 ">
                <div className="customer-search sm-mb-0 mb-3">
                  <div className="input-group search-area">
                    <span className="input-group-text">
                      <a href="javascript:void(0)">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.16602 16.6665C13.3082 16.6665 16.666 13.3086 16.666 9.1665C16.666 5.02437 13.3082 1.6665 9.16602 1.6665C5.02388 1.6665 1.66602 5.02437 1.66602 9.1665C1.66602 13.3086 5.02388 16.6665 9.16602 16.6665Z"
                            stroke="#858F9E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M15.775 17.2413C16.2167 18.5747 17.225 18.708 18 17.5413C18.7084 16.4747 18.2417 15.5997 16.9584 15.5997C16.0084 15.5913 15.475 16.333 15.775 17.2413Z"
                            stroke="#858F9E"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </a>
                    </span>
                    <input
                      type="text"
                      className="form-control ps-1"
                      placeholder="Search here......"
                      value={searchtxt}
                      onChange={(event) => {
                        search(event.target.value);
                        setSearchtxt(event.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="row d-none">
                  <div className="col-lg-4 col-md-4">
                    <div>
                      <p className="mb-0">
                        <b className="text-danger">Total Add</b>
                      </p>
                      <h2>
                        <b>₹ {wallet?.totalAdd?.toFixed(2)}</b>
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div>
                      <p className="mb-0">
                        <b className="text-blue">Total Withdraw</b>
                      </p>
                      <h2>
                        <b>₹ {wallet?.totalWithdrawal?.toFixed(2)}</b>
                      </h2>
                    </div>
                  </div>
                  
                  <div className="col-lg-4 col-md-4">
                    <div>
                      <p className="mb-0">
                        <b>Total</b>
                      </p>
                      <h2>
                        <b>₹ {wallet?.total?.toFixed(2)}</b>
                      </h2>
                    </div>
                  </div>
                </div>
                {/* <button
                           style={{marginLeft:"-90px"}}
                type="button"
                class="btn btn-primary mt-0 me-3"
                data-bs-dismiss="modal"
                onClick={handlePrint}
                  // onClick={() => {
                  //   Add();
                  // }}
              >
                Print
              </button> */}
            
                <div className="row">
                  <div className="col-lg-3 d-none d-lg-block"></div>

                  <div className="col-lg-3 col-md-4">
                    <div>
                      <p className="mb-0">
                        <b className="text-blue">Pending Settelment</b>
                      </p>
                      <h2>
                        <b>₹ {wallet?.total?.toFixed(2)}</b>
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <div>
                      <p className="mb-0">
                        <b>Total Withdrawal</b>
                      </p>
                      <h2>
                        <b>₹ {wallet?.totalWithdrawal?.toFixed(2)}</b>
                      </h2>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-4">
                    <a
                      className="btn main_btn"
                      data-bs-toggle="modal"
                      data-bs-target="#add-menu-box"
                    >
                      Settelment
                    </a>
                  </div>
                
               
                </div>

              </div>
            </div>
            {/* <div className="form-group" style={{ marginLeft: "1%" }}>
  <label>Select Start Date</label>
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    selectsStart
    startDate={startDate}
    endDate={endDate}
    className="form-control"
    style={{
      width: "175px", // set the width of the input field
      padding: "10px", // add some padding to the input field
      border: "1px solid #ccc", // change the border style
      borderRadius: "5px", // add a border radius
    }}
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
    style={{
      width: "175px", // set the width of the input field
      padding: "10px", // add some padding to the input field
      border: "1px solid #ccc", // change the border style
      borderRadius: "5px", // add a border radius
      marginLeft: "10px", // add some margin to the left
    }}
  />
</div> */}
            {data.length !== 0 ? (
              <div className="row" ref={tableRef}>
                <div className="col-xl-12">
                  <div className="table-responsive">
                    <table
                      className="table display mb-4 dataTablesCard order-table shadow-hover  card-table text-black"
                      id="example5"
                    >
                      <thead>
                        <tr>
                          {/* <th>
                            <div className="form-check ms-2">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                defaultValue=""
                                id="checkAll"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkAll"
                              ></label>
                            </div>
                          </th> */}
                          <th>Order ID</th>
                          <th>transactionID</th>
                          <th>Food</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date &amp; Time</th>
                          {/* <th>Action</th> */}
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((item, index) => (
                          <tr>
                            {/* <td className="tbl-bx">
                              <div className="form-check ms-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue=""
                                  id="customCheckBox10"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="customCheckBox10"
                                ></label>
                              </div>
                            </td> */}
                            <td>
                              <a href="order-details-page.html">
                                #{item?._id}
                                {/* {item?._id.substring(item?._id.length - 8)} */}
                              </a>
                            </td>
                            <td>233345454</td>
                            <td>
                              <div className="d-flex gap-3">
                                {/* <img src="images/dish.svg" /> */}
                                <img
                                  src={`${baseurl}${item?.orderId?.orderItems[0]?.image}`}
                                  style={{
                                    width: 50,
                                    height: 50,
                                    maxWidth: 60,
                                    maxHeight: 60,
                                    borderRadius: 13,
                                  }}
                                />
                                <div className="food-pr-nm">
                                  <p>
                                    {item?.orderId?.orderItems[0].quantity} x{" "}
                                    {item?.orderId?.orderItems[0].item}
                                  </p>
                                  {item?.orderId?.orderItems.length !== 1 && (
                                    <h6>
                                      + {item?.orderId?.orderItems.length - 1}{" "}
                                      {item?.orderId?.orderItems.length === 2
                                        ? "Item"
                                        : "Items"}
                                    </h6>
                                  )}
                                  <p>₹ {item?.orderId?.orderItems[0].price}</p>
                                </div>
                              </div>
                            </td>
                            <td className="text-ov">
                              ₹{item?.amount.toFixed(2)}
                            </td>
                            <td>
                              <span className="btn bglp-success  btn-rounded btn-sm">
                                Paid
                              </span>
                            </td>
                            <td className="wspace-no">
                              {new Date(item.createdAt).toLocaleString(
                                "en-US",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  hour12: true,
                                }
                              )}
                            </td>
                            {/* <td>
  
                            View Details

                          </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <h3>No Data Found !</h3>
            )}
            {data.length !== 0 && (
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      if (currentpage !== 1) {
                        setCurrentpage(currentpage - 1);
                      }
                    }}
                    aria-label="Previous"
                    style={{ backgroundColor: "grey" }}
                  >
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                {numbers.map((num) => (
                  <li
                    className={`page-item ${
                      currentpage === num ? "active" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() => setCurrentpage(num)}
                    >
                      {num}
                    </span>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      if (currentpage !== numbers.length) {
                        setCurrentpage(currentpage + 1);
                      }
                    }}
                    aria-label="Next"
                    style={{ backgroundColor: "grey" }}
                  >
                    <span aria-hidden="true">»</span>
                  </a>
                </li>
              </ul>
            )}
          </div>
          {load && <Loader />}
        </div>
        {/***********************************
      Content body end
  ************************************/}
        {/***********************************
      Footer start
  ************************************/}
        <div className="footer">
          <div className="copyright">
            <p>
              Copyright © Designed &amp; Developed by{" "}
              <a href="#" target="_blank">
                HelloDish
              </a>{" "}
              2024
            </p>
          </div>
        </div>
        {/***********************************
      Footer end
  ************************************/}
        {/***********************************
     Support ticket button start
  ************************************/}
        {/***********************************
     Support ticket button end
  ************************************/}
      </div>
      {/***********************************
  Main wrapper end
    ************************************/}
      {/***********************************
  Scripts
    ************************************/}
      {/* Required vendors */}
      {/* Apex Chart */}
      {/* Chart piety plugin files */}
      {/* Dashboard 1 */}
      {/* Datatable */}
      {/* Modal */}
      <div
        class="modal fade"
        id="add-menu-box"
        tabindex="-1"
        aria-labelledby="add-menu-boxLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog model-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add-menu-boxLabel">
                <b>Settelment</b>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row add-menu-page">
                <div class="col-lg-12 mx-auto">
                  <div class="card">
                    <div class="form-group">
                      <label for="titel" class="">
                        Amount
                      </label>
                      <input
                        type="text"
                        name="titel"
                        id="titel"
                        class="form-control"
                        value={amt}
                        onChange={(event) => {
                          let val = event.target.value;
                          if (val === "" || /^\d+$/.test(val)) {
                            setAmt(val);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary mt-0 me-3"
                data-bs-dismiss="modal"
                onClick={() => {
                  Add();
                }}
              >
                Settelment
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Driverpayment;