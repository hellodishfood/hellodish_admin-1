import { React, useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import userEvent from "@testing-library/user-event";
import { baseurl } from "../../Utilities/Api";
import { useLocation, Link } from "react-router-dom";
import Loader from "../Loader";
import Calendar from "react-calendar";

function RestaurantPayment() {
  const location = useLocation();
  const data1 = location?.state?.data;
  const [date, setDate] = useState("");
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);

  useEffect(() => {
    GetAllPayment();
  }, []);

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
      `${baseurl}admin/api/getAllPayment/${data1?.restaurant?._id}/0`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        setData(result?.data);
        setoData(result?.data);
        setW(result?.wallet);
        console.log(result);
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  function GetData2(type) {
    if (type === "date") {
      let nd = new Date(date);
      const filteredItems = data.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate.toDateString() === nd.toDateString();
      });
      setCurrentpage(1);
      setData(filteredItems);
    } else if (type === "week") {
      const [startDate, endDate] = week.map((date) => new Date(date));
      const filteredItems = data.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setCurrentpage(1);
      setData(filteredItems);
    } else if (type === "month") {
      const [startDate, endDate] = month.map((date) => new Date(date));
      const filteredItems = data.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setCurrentpage(1);
      setData(filteredItems);
    } else if (type === "year") {
      const [startDate, endDate] = year.map((date) => new Date(date));
      const filteredItems = data.filter((item) => {
        const itemDate = new Date(item.createdAt);
        return itemDate >= startDate && itemDate <= endDate;
      });
      setCurrentpage(1);
      setData(filteredItems);
    }
  }

  const [data, setData] = useState([]);
  const [amt, setAmt] = useState("");
  const [w, setW] = useState([]);
  const [load, setLoad] = useState(false);
  const [searchtxt, setSearchtxt] = useState("");
  const [odata, setoData] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
      type: "0",
      id: data1?.restaurant?._id,
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
                    {/* <div className="input-group search-area">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here"
                      />
                      <span className="input-group-text">
                        <a href="javascript:void(0)">
                          <i className="flaticon-381-search-2" />
                        </a>
                      </span>
                    </div> */}
                  </div>
                </div>
                <ul className="navbar-nav header-right">
                  <li className="nav-item">
                    <div className="card-action coin-tabs mt-3 mt-sm-0">
                      <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            data-bs-toggle="modal"
                            data-bs-target="#calendarModal"
                            // href="#day"
                            role="tab"
                          >
                            Day
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link "
                            // data-bs-toggle="tab"
                            data-bs-toggle="modal"
                            data-bs-target="#weekModal"
                            // href="#Week"
                            role="tab"
                          >
                            Week
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link " //active
                            // data-bs-toggle="tab"
                            data-bs-toggle="modal"
                            data-bs-target="#monthModal"
                            // href="#Month"
                            role="tab"
                          >
                            Month
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class="nav-link"
                            // data-bs-toggle="tab"
                            data-bs-toggle="modal"
                            data-bs-target="#yearModal"
                            // href="#Year"
                            role="tab"
                          >
                            Year
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li className="nav-item dropdown notification_dropdown">
                    <a
                      className="nav-link  ai-icon"
                      href="javascript:void(0);"
                      role="button"
                      data-bs-toggle="dropdown"
                    >
                      <svg
                        width={28}
                        height={28}
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.75 15.8385V13.0463C22.7471 10.8855 21.9385 8.80353 20.4821 7.20735C19.0258 5.61116 17.0264 4.61555 14.875 4.41516V2.625C14.875 2.39294 14.7828 2.17038 14.6187 2.00628C14.4546 1.84219 14.2321 1.75 14 1.75C13.7679 1.75 13.5454 1.84219 13.3813 2.00628C13.2172 2.17038 13.125 2.39294 13.125 2.625V4.41534C10.9736 4.61572 8.97429 5.61131 7.51794 7.20746C6.06159 8.80361 5.25291 10.8855 5.25 13.0463V15.8383C4.26257 16.0412 3.37529 16.5784 2.73774 17.3593C2.10019 18.1401 1.75134 19.1169 1.75 20.125C1.75076 20.821 2.02757 21.4882 2.51969 21.9803C3.01181 22.4724 3.67904 22.7492 4.375 22.75H9.71346C9.91521 23.738 10.452 24.6259 11.2331 25.2636C12.0142 25.9013 12.9916 26.2497 14 26.2497C15.0084 26.2497 15.9858 25.9013 16.7669 25.2636C17.548 24.6259 18.0848 23.738 18.2865 22.75H23.625C24.321 22.7492 24.9882 22.4724 25.4803 21.9803C25.9724 21.4882 26.2492 20.821 26.25 20.125C26.2486 19.117 25.8998 18.1402 25.2622 17.3594C24.6247 16.5786 23.7374 16.0414 22.75 15.8385ZM7 13.0463C7.00232 11.2113 7.73226 9.45223 9.02974 8.15474C10.3272 6.85726 12.0863 6.12732 13.9212 6.125H14.0788C15.9137 6.12732 17.6728 6.85726 18.9703 8.15474C20.2677 9.45223 20.9977 11.2113 21 13.0463V15.75H7V13.0463ZM14 24.5C13.4589 24.4983 12.9316 24.3292 12.4905 24.0159C12.0493 23.7026 11.716 23.2604 11.5363 22.75H16.4637C16.284 23.2604 15.9507 23.7026 15.5095 24.0159C15.0684 24.3292 14.5411 24.4983 14 24.5ZM23.625 21H4.375C4.14298 20.9999 3.9205 20.9076 3.75644 20.7436C3.59237 20.5795 3.50014 20.357 3.5 20.125C3.50076 19.429 3.77757 18.7618 4.26969 18.2697C4.76181 17.7776 5.42904 17.5008 6.125 17.5H21.875C22.571 17.5008 23.2382 17.7776 23.7303 18.2697C24.2224 18.7618 24.4992 19.429 24.5 20.125C24.4999 20.357 24.4076 20.5795 24.2436 20.7436C24.0795 20.9076 23.857 20.9999 23.625 21Z"
                          fill="#9B9B9B"
                        />
                      </svg>
                      <span className="badge light text-white bg-primary rounded-circle">
                        12
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <div
                        id="DZ_W_Notification1"
                        className="widget-media dz-scroll p-3"
                        style={{ height: 380 }}
                      >
                        <ul className="timeline">
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img
                                  alt="image"
                                  width={50}
                                  src="images/avatar/1.jpg"
                                />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-info">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-success">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2">
                                <img
                                  alt="image"
                                  width={50}
                                  src="images/avatar/1.jpg"
                                />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Dr sultads Send you Photo
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-danger">KG</div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Resport created successfully
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="timeline-panel">
                              <div className="media me-2 media-primary">
                                <i className="fa fa-home" />
                              </div>
                              <div className="media-body">
                                <h6 className="mb-1">
                                  Reminder : Treatment Time!
                                </h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <a
                        className="all-notification"
                        href="javascript:void(0);"
                      >
                        See all notifications <i className="ti-arrow-end" />
                      </a>
                    </div>
                  </li>
                  <li className="nav-item dropdown notification_dropdown">
                    <a
                      className="nav-link bell-link ai-icon"
                      href="javascript:void(0);"
                    >
                      <svg
                        width={28}
                        height={28}
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M22.4604 3.84888H5.31685C4.64745 3.84961 4.00568 4.11586 3.53234 4.58919C3.059 5.06253 2.79276 5.7043 2.79202 6.3737V18.1562C2.79276 18.8256 3.059 19.4674 3.53234 19.9407C4.00568 20.4141 4.64745 20.6803 5.31685 20.6811C5.54002 20.6812 5.75401 20.7699 5.91181 20.9277C6.06961 21.0855 6.15832 21.2995 6.15846 21.5227V23.3168C6.15846 23.6215 6.24115 23.9204 6.39771 24.1818C6.55427 24.4431 6.77882 24.6571 7.04744 24.8009C7.31605 24.9446 7.61864 25.0128 7.92295 24.9981C8.22726 24.9834 8.52186 24.8863 8.77536 24.7173L14.6173 20.8224C14.7554 20.7299 14.9179 20.6807 15.0841 20.6811H19.187C19.7383 20.68 20.2743 20.4994 20.7137 20.1664C21.1531 19.8335 21.472 19.3664 21.6222 18.8359L24.8965 7.05011C24.9999 6.67481 25.0152 6.28074 24.9413 5.89856C24.8675 5.51637 24.7064 5.15639 24.4707 4.84663C24.235 4.53687 23.9309 4.28568 23.5823 4.11263C23.2336 3.93957 22.8497 3.84931 22.4604 3.84888ZM23.2733 6.60304L20.0006 18.3847C19.95 18.5614 19.8432 18.7168 19.6964 18.8275C19.5496 18.9381 19.3708 18.9979 19.187 18.9978H15.0841C14.5856 18.9972 14.0981 19.1448 13.6836 19.4219L7.84168 23.3168V21.5227C7.84094 20.8533 7.5747 20.2115 7.10136 19.7382C6.62802 19.2648 5.98625 18.9986 5.31685 18.9978C5.09368 18.9977 4.87969 18.909 4.72189 18.7512C4.56409 18.5934 4.47537 18.3794 4.47524 18.1562V6.3737C4.47537 6.15054 4.56409 5.93655 4.72189 5.77874C4.87969 5.62094 5.09368 5.53223 5.31685 5.5321H22.4604C22.5905 5.53243 22.7188 5.56277 22.8352 5.62076C22.9517 5.67875 23.0532 5.76283 23.1318 5.86646C23.2105 5.97008 23.2641 6.09045 23.2887 6.21821C23.3132 6.34597 23.3079 6.47766 23.2733 6.60304Z"
                          fill="#9B9B9B"
                        />
                        <path
                          d="M7.84167 11.4233H12.0497C12.2729 11.4233 12.487 11.3347 12.6448 11.1768C12.8027 11.019 12.8913 10.8049 12.8913 10.5817C12.8913 10.3585 12.8027 10.1444 12.6448 9.98661C12.487 9.82878 12.2729 9.74011 12.0497 9.74011H7.84167C7.61846 9.74011 7.4044 9.82878 7.24656 9.98661C7.08873 10.1444 7.00006 10.3585 7.00006 10.5817C7.00006 10.8049 7.08873 11.019 7.24656 11.1768C7.4044 11.3347 7.61846 11.4233 7.84167 11.4233Z"
                          fill="#9B9B9B"
                        />
                        <path
                          d="M15.4162 13.1066H7.84167C7.61846 13.1066 7.4044 13.1952 7.24656 13.3531C7.08873 13.5109 7.00006 13.725 7.00006 13.9482C7.00006 14.1714 7.08873 14.3855 7.24656 14.5433C7.4044 14.7011 7.61846 14.7898 7.84167 14.7898H15.4162C15.6394 14.7898 15.8534 14.7011 16.0113 14.5433C16.1691 14.3855 16.2578 14.1714 16.2578 13.9482C16.2578 13.725 16.1691 13.5109 16.0113 13.3531C15.8534 13.1952 15.6394 13.1066 15.4162 13.1066Z"
                          fill="#9B9B9B"
                        />
                      </svg>
                      <span className="badge light text-white bg-primary rounded-circle">
                        5
                      </span>
                    </a>
                  </li>
                </ul>
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
            <div className="mb-lg-4  d-flex flex-wrap align-items-center text-head">
              <div>
                <h2 className="mb-3 me-auto">
                  {data1?.restaurant?.restaurantName}
                </h2>
                <p>{data1?.restaurant?.restaurantAddress}</p>
              </div>
            </div>
            <div className="mb-4 col-lg-12 d-flex justify-content-between align-items-center flex-wrap">
              <div className="customer-search sm-mb-0 mb-3 col-lg-4">
                <div className="input-group search-area">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here......"
                    value={searchtxt}
                    onChange={(event) => {
                      search(event.target.value);
                      setSearchtxt(event.target.value);
                    }}
                  />
                  <span className="input-group-text">
                    <a href="javascript:void(0)">
                      <i className="flaticon-381-search-2" />
                    </a>
                  </span>
                </div>
              </div>
              <ul className="navbar-nav header-right col-lg-8">
                <li>
                  <div className="row">
                    <div className="col-lg-3 d-none d-lg-block"></div>

                    <div className="col-lg-3 col-md-4">
                      <div>
                        <p className="mb-0">
                          <b className="text-blue">Pending Settelment</b>
                        </p>
                        <h2>
                          <b>₹ {w?.total?.toFixed(2)}</b>
                        </h2>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4">
                      <div>
                        <p className="mb-0">
                          <b>Total Withdrawal</b>
                        </p>
                        <h2>
                          <b>₹ {w?.totalWithdrawal?.toFixed(2)}</b>
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
                </li>
              </ul>
              {/* <div>
                <a
                  href="javascript:void(0);"
                  className="btn bg-white btn-rounded me-2 text-black shadow-sm"
                >
                  <i className="fas fa-calendar-times me-3 scale3 text-primary" />
                  Filter
                  <i className="fas fa-chevron-down ms-3 text-primary" />
                </a>
                <a
                  onClick={() => {
                    setData(odata);
                  }}
                  className="btn btn-primary btn-rounded"
                >
                  <i className="fas fa-sync" />
                </a>
              </div> */}
            </div>

            {data.length !== 0 ? (
              <div className="row">
                <div className="col-xl-12">
                  <div className="table-responsive">
                    <table
                      className="table display mb-4 dataTablesCard order-table shadow-hover  card-table text-black"
                      id="example5"
                    >
                      <thead>
                        <tr>
                          <th>orderID</th>
                          <th>transactionID</th>
                          <th>Food</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Date &amp; Time</th>
                          <th>action</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((item, index) => (
                          <tr>
                            <td>
                              #{item?._id}
                              {/* {item?._id.substring(item?._id.length - 8)} */}
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
                                  <p>
                                    ₹{" "}
                                    {item?.orderId?.orderItems[0].price?.toFixed(
                                      2
                                    )}
                                  </p>
                                  {item?.orderId?.orderItems.length !== 1 && (
                                    <h6>
                                      + {item?.orderId?.orderItems.length - 1}{" "}
                                      {item?.orderId?.orderItems.length === 2
                                        ? "Item"
                                        : "Items"}
                                    </h6>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="text-ov">
                              ₹{item?.amount?.toFixed(2)}
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
                            {/*  
                          <td>
                            View Details
                            
                          </td>
                          */}
                          <td>
                            download
                          </td>
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
      {/*  */}
      <div
        class="modal fade"
        id="calendarModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Select Day
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Calendar
                value={date}
                onChange={(e) => {
                  setDate(e);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (date !== "") {
                    GetData2("date");
                  }
                }}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        class="modal fade"
        id="weekModal"
        tabindex="-1"
        aria-labelledby="weekModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="weekModalLabel">
                Select Week
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Calendar
                // value={date}
                selectRange={true}
                onChange={(e) => {
                  setWeek(e);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (week.length !== 0) {
                    GetData2("week");
                  }
                }}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        class="modal fade"
        id="monthModal"
        tabindex="-1"
        aria-labelledby="monthModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="monthModalLabel">
                Select Month
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Calendar
                view="year"
                onClickMonth={(e) => {
                  const year = e.getFullYear();
                  const month = e.getMonth();
                  const lastDate = new Date(year, month + 1, 0);
                  const formattedLastDate = lastDate;
                  let arr = [e, formattedLastDate];
                  setMonth(arr);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (month.length !== 0) {
                    GetData2("month");
                  }
                }}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div
        class="modal fade"
        id="yearModal"
        tabindex="-1"
        aria-labelledby="yearModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="yearModalLabel">
                Select Year
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Calendar
                view="decade"
                onClickYear={(e) => {
                  const year = e.getFullYear();
                  const lastDayOfYear = new Date(year, 11, 31);
                  let arr = [e, lastDayOfYear];

                  setYear(arr);
                }}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (year.length !== 0) {
                    GetData2("year");
                  }
                }}
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RestaurantPayment;
