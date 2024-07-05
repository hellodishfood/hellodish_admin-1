import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import {
  token,
  PendingRestaurantApi,
  RestaurantApi,
  UpdateRestaurantStatusApi,
  baseurl,
} from "../../Utilities/Api";
import { useHelloDishApp } from "../../contexts/HelloDishAppProvider";
import Loader from "../Loader";

function Restaurant() {
  const { GetListData, UpdateStatusApproveAndRejectStatus } = useHelloDishApp();
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [oapprovedData, setoApprovedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [load, setLoad] = useState(false);
  const [pcurrentpage, setpCurrentpage] = useState(1);
  const precordsPerPage = 3;
  const plastIndex = pcurrentpage * precordsPerPage;
  const pfirstIndex = plastIndex - precordsPerPage;
  const precords = pendingData.slice(pfirstIndex, plastIndex);
  const pnpage = Math.ceil(pendingData.length / precordsPerPage);
  const pnumbers = [...Array(pnpage + 1).keys()].slice(1);
  const [acurrentpage, setaCurrentpage] = useState(1);
  const arecordsPerPage = 10;
  const alastIndex = acurrentpage * arecordsPerPage;
  const afirstIndex = alastIndex - arecordsPerPage;
  const arecords = approvedData.slice(afirstIndex, alastIndex);
  const anpage = Math.ceil(approvedData.length / arecordsPerPage);
  const anumbers = [...Array(anpage + 1).keys()].slice(1);

  useEffect(() => {
    RestaurantApproved();
    RestaurantApprovalPending();
    getCommision();
  }, []);

  const handleSearch = (event) => {
    const searcherm = event.target.value;
    search(searcherm);
    setSearchTerm(searcherm);
  };

  const search = (val) => {
    if (val !== "") {
      const searchResult = oapprovedData.filter(
        (restaurant) =>
          restaurant.restaurant?.restaurantName
            .toLowerCase()
            .includes(val.toLowerCase()) ||
          restaurant.restaurant.phone.includes(val)
      );
      setaCurrentpage(1);
      setApprovedData(searchResult);
    } else {
      setaCurrentpage(1);
      setApprovedData(oapprovedData);
    }
  };

  const RestaurantApprovalPending = async () => {
    setLoad(true);
    const result = await GetListData(PendingRestaurantApi);
    if (result.isOk && result.data?.data?.length > 0) {
      setLoad(false);
      console.log("deepanshu", result.data?.data);
      setPendingData(result?.data?.data);
    } else {
      setLoad(false);
      setPendingData([]);
    }
  };

  const RestaurantApproved = async () => {
    setLoad(true);
    const result = await GetListData(RestaurantApi);

    if (result.isOk && result.data?.data?.length > 0) {
      setLoad(false);

      setApprovedData(result?.data?.data);
      setoApprovedData(result?.data?.data);
      getCommision();
    } else {
      setLoad(false);
    }
  };

  const RestaurantUpdateStatus = async (restaurantId, type) => {
    setLoad(true);
    const result = await UpdateStatusApproveAndRejectStatus(
      `${UpdateRestaurantStatusApi}/${restaurantId}/${type}`
    );

    if (result.isOk) {
      setLoad(false);
      console.log("restaurant type");
      RestaurantApprovalPending();
    } else {
      setLoad(false);
    }
  };
  const handleApprove = (restaurantId) => {
    RestaurantUpdateStatus(restaurantId, 1);
  };

  const handleReject = (restaurantId) => {
    RestaurantUpdateStatus(restaurantId, 0);
  };

  const [comm, setComm] = useState("");

  const getCommision = () => {
    setLoad(true);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/getAdminCommission`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          setComm(result.data.rate);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const UpdateComission = () => {
    setLoad(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      rate: comm,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/updateAdminComission`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          getCommision();
        } else {
          setLoad(false);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  return (
    <>
      {/********************
    Preloader start test
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
                    <h3 className="font-w700">Restaurants</h3>
                  </div>
                </div>
                <ul class="navbar-nav header-right" style={{marginLeft:"680px",marginTop:"20px"}}>
                  <li class="nav-item">
                    <Link class="btn main_btn" to={"/AddRestaurant"}>
                      Add Restaurant
                    </Link>
                  </li>
                  </ul>
                <button
                style={{height:"40px",width:"80px",marginTop:"20px",marginRight:"100px"}}
                    type="button"
                    class="btn main_btn"
                    onClick={() => {
                      if (comm !== "") {
                        UpdateComission();
                      }
                    }}
                  >
                    Save
                  </button>
               
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
          {/* <!-- row --> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-12 mb-3">
                <h4>Admin Commision on Restaurant Food</h4>
                <div class="search-area d-flex align-items-center gap-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Admission Commision on Restaurant Food"
                    value={comm}
                    onChange={(e) => setComm(e.target.value)}
                  ></input>
                  <h4>%</h4>
                 
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <h4 className="font-w600">{pendingData.length}</h4>
                <h4>New Restaurant pending request</h4>
              </div>
              <div className="col-xl-12">
                <div className="row menu-page">
                  {precords?.map((item, index) => (
                    <div className="col-xl-4 col-md-6 col-sm-12">
                      <div className="card">
                        <div className="card-body row align-items-center">
                          <div className="col-lg-3 col-5">
                            <Link
                              to="/RestaurantDetails"
                              state={{ data: item }}
                            >
                              <small className="text-black">
                                {item.restaurant.profileImage !== "" ? (
                                  <img
                                    src={`${baseurl}${item.restaurant.profileImage}`}
                                    alt=""
                                    className="appruve-resto-img"
                                  />
                                ) : (
                                  <img
                                    src="images/logooo.png"
                                    alt=""
                                    className="appruve-resto-img"
                                  />
                                )}
                              </small>
                            </Link>
                          </div>

                          <div className="col-lg-5 col-7">
                            <Link
                              to="/RestaurantDetails"
                              state={{ data: item }}
                            >
                              <h5
                                className="font-w700 fs-16 d-block mb-2"
                                style={{ whiteSpace: "nowrap" }}
                              >
                                {item?.restaurant?.restaurantName}
                              </h5>
                              <p
                                className="mb-0"
                                style={{ textOverflow: "ellipsis" }}
                              >
                                {item?.restaurant?.restaurantAddress}
                              </p>
                            </Link>
                          </div>

                          <div className="col-lg-4   p-0 d-flex flex-column resto-top-button">
                            <button
                              type="button"
                              className="btn btn-success1"
                              style={{ marginLeft: "-7px !important" }}
                              onClick={() => handleApprove(item.restaurant._id)}
                            >
                              Approve
                            </button>
                            <button
                              type="button"
                              className="btn main_btn"
                              style={{ marginLeft: "-7px !important" }}
                              onClick={() => handleReject(item.restaurant._id)}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {pendingData.length !== 0 && (
              <ul className="pagination">
                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      if (pcurrentpage !== 1) {
                        setpCurrentpage(pcurrentpage - 1);
                      }
                    }}
                    aria-label="Previous"
                    style={{ backgroundColor: "grey" }}
                  >
                    <span aria-hidden="true">«</span>
                  </a>
                </li>
                {pnumbers.map((num) => (
                  <li
                    className={`page-item ${
                      pcurrentpage === num ? "active" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() => setpCurrentpage(num)}
                    >
                      {num}
                    </span>
                  </li>
                ))}

                <li className="page-item">
                  <a
                    className="page-link"
                    onClick={() => {
                      if (pcurrentpage !== pnumbers.length) {
                        setpCurrentpage(pcurrentpage + 1);
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
            {/* <PaginationButtons
              totalPages={numbers}
              currentPage={pcurrentPage}
              setCurrentPage={setCurrentPage}
            /> */}
            <div className="row menu-page">
              <div className="col-12 col-md-6 mb-2">
                <div className="d-flex flex-wrap align-items-center gap-2 approved-drivers">
                  <p className="mb-0">
                    {filteredData.length > 0 ? (
                      <b className="text-black">
                        {filteredData.length} Restaurant
                      </b>
                    ) : (
                      <b className="text-black">
                        {approvedData.length} Restaurant
                      </b>
                    )}
                  </p>

                  <div className="search-area-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search Restaurant"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.1665 16.6667C13.3086 16.6667 16.6665 13.3089 16.6665 9.16675C16.6665 5.02461 13.3086 1.66675 9.1665 1.66675C5.02437 1.66675 1.6665 5.02461 1.6665 9.16675C1.6665 13.3089 5.02437 16.6667 9.1665 16.6667Z"
                        stroke="#858F9E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.775 17.2416C16.2167 18.5749 17.225 18.7083 18 17.5416C18.7084 16.4749 18.2417 15.5999 16.9584 15.5999C16.0084 15.5916 15.475 16.3333 15.775 17.2416Z"
                        stroke="#858F9E"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>

                  {/* Search area remains the same */}
                </div>
              </div>

              <div className="col-12">
                {/* Show restaurant cards for the current page */}
                {arecords.length !== 0 ? (
                  arecords.map((item, index) => (
                    <div className="card">
                      <div className="card-body row align-items-center">
                        <div className="col-lg-3 col-sm-5 col-12">
                          <div className="row">
                            <div className="col-3">
                              <small className="text-black">
                                {item.restaurant.profileImage !== "" ? (
                                  <img
                                    src={`${baseurl}${item.restaurant.profileImage}`}
                                    alt=""
                                    className="appruve-resto-img"
                                  />
                                ) : (
                                  <img
                                    src="images/logooo.png"
                                    alt=""
                                    className="appruve-resto-img"
                                  />
                                )}
                              </small>
                            </div>
                            <div className="col-9">
                              <h5 className="font-w600 fs-16 d-block mb-2">
                                {item?.restaurant?.restaurantName}
                              </h5>
                              <p className="mb-0">
                                {item?.restaurant?.restaurantAddress}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-9 col-sm-7 col-12 Restaurant-btn">
                          <button
                            type="button"
                            className="btn main_btn pending my-1"
                          >
                            <Link
                              to="/RestaurantDetails"
                              state={{ data: item }}
                            >
                              Restaurant Details
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="btn main_btn  cancelled my-1"
                          >
                            <Link to="/RestaurantOrders" state={{ data: item }}>
                              Food Orders
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success1 dark-green my-1"
                          >
                            <Link
                              to="/RestaurantFoodMenu"
                              state={{ data: item }}
                            >
                              Food and Menu
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="btn main_btn light-yallo my-1"
                          >
                            <Link
                              to={"/RestaurantPayment"}
                              state={{ data: item }}
                            >
                              Payment
                            </Link>
                          </button>
                          <button
                            type="button"
                            className="btn btn-success1 active-orders my-1"
                          >
                            <Link
                              to={"/RestaurantAnalytics"}
                              state={{ data: item }}
                            >
                              View Analystic
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <h4>No Restaurants Found !</h4>
                )}

                {/* Add the pagination buttons below */}

                {approvedData.length !== 0 && (
                  <ul className="pagination">
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          if (acurrentpage !== 1) {
                            setaCurrentpage(acurrentpage - 1);
                          }
                        }}
                        aria-label="Previous"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    {anumbers.map((num) => (
                      <li
                        className={`page-item ${
                          acurrentpage === num ? "active" : ""
                        }`}
                      >
                        <span
                          className="page-link"
                          onClick={() => setaCurrentpage(num)}
                        >
                          {num}
                        </span>
                      </li>
                    ))}

                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          if (acurrentpage !== anumbers.length) {
                            setaCurrentpage(acurrentpage + 1);
                          }
                        }}
                        aria-label="Next"
                        style={{ backgroundColor: "transpareent" }}
                      >
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                )}
                {/* {approvedData.length !== 0 && (
                  <ul
                    className="pagination"
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          if (acurrentpage !== 1) {
                            setaCurrentpage(acurrentpage - 1);
                          }
                        }}
                        aria-label="Previous"
                        style={{ backgroundColor: "transparent" }}
                      >
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>

                    <li className={`page-item`} style={{ color: "black" }}>
                      <strong>Page </strong>
                      <strong style={{ color: "red" }}>{acurrentpage}</strong>
                      <strong> of {anumbers.length} Pages</strong>
                    </li>

                    <li className="page-item">
                      <a
                        className="page-link"
                        onClick={() => {
                          if (acurrentpage !== anumbers.length) {
                            setaCurrentpage(acurrentpage + 1);
                          }
                        }}
                        aria-label="Next"
                        style={{ backgroundColor: "transpareent" }}
                      >
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                )} */}
              </div>
            </div>
            {load && <Loader />}
          </div>
        </div>

        {/* <PaginationButtons
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        /> */}
        {/***********************************
        Content body end
    ************************************/}
        {/***********************************
        Footer start
    ************************************/}
        <div className="footer">
          <div className="copyright">
            <p>
              Copyright © Designed &amp; Developed by
              <a href="https://HelloDish.com/" target="_blank">
                HelloDish
              </a>
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
      {/*  */}
      {/* Chart piety plugin files */}
      {/* Dashboard 1 */}
      {/*  */}
    </>
  );
}

export default Restaurant;
