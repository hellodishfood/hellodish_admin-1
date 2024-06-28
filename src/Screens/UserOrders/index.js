import { React, useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { useLocation, Link } from "react-router-dom";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";

function UserOrders() {
  const location = useLocation();
  const data = location?.state?.data;
  useEffect(() => {
    console.log(data);
    GetOrders();
  }, []);

  const GetOrders = () => {
    setLoad(true);

    // const token = await localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/getAllOrder/${data?._id}/2`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          let updatedata = result.data.map((e) => ({
            ...e,
            datetime: GetDateandTime(e.order.createdAt),
          }));
          console.log(data);
          setOrders(updatedata);
          setOorders(updatedata);
          setOrderCount(result?.orders);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const GetDateandTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "2-digit", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const time = `${hours}:${minutes} ${amOrPm}`;
    const dt = `${formattedDate},${time}`;
    return dt;
  };

  const [load, setLoad] = useState(false);
  const [orders, setOrders] = useState([]);
  const [oorders, setOorders] = useState([]);
  const [orderCount, setOrderCount] = useState({});
  const [currentpage, setCurrentpage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = orders.slice(firstIndex, lastIndex);
  const npage = Math.ceil(orders.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [searchtxt, setSearchtxt] = useState("");

  const search = (val) => {
    if (val !== "") {
      const searchResult = oorders.filter((item) =>
        item.order._id.toLowerCase().includes(val.toLowerCase())
      );
      setCurrentpage(1);
      setOrders(searchResult);
    } else {
      setCurrentpage(1);
      setOrders(oorders);
    }
  };

  return (
    <>
      {/********************f
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
                    <h2 className="my-2 me-auto">User Orders List</h2>
                    {/* <p>kalavad road, rajkot</p> */}
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
        {/***********************************
      Header end ti-comment-alt
  ************************************/}

        <Slidebar />

        {/***********************************
      Content body start
  ************************************/}
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row menu-page">
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card pending">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <svg
                      width={55}
                      height={50}
                      viewBox="0 0 55 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={55} height={50} rx={18} fill="white" />
                      <path
                        d="M38 25C38 30.52 33.52 35 28 35C22.48 35 18 30.52 18 25C18 19.48 22.48 15 28 15C33.52 15 38 19.48 38 25Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 24.5L26.5299 27L32 22"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="menu">
                      <span className="font-w500 fs-16 d-block mb-2 text-black">
                        Pending Orders
                      </span>
                      <h4>{orderCount?.countPendingOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card completed">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <svg
                      width={55}
                      height={50}
                      viewBox="0 0 55 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={55} height={50} rx={18} fill="white" />
                      <path
                        d="M38 25C38 30.52 33.52 35 28 35C22.48 35 18 30.52 18 25C18 19.48 22.48 15 28 15C33.52 15 38 19.48 38 25Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 24.5L26.5299 27L32 22"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="menu">
                      <span className="font-w500 fs-16 d-block mb-2 text-black">
                        Completed Orders
                      </span>
                      <h4>{orderCount?.countCompleteOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card cancelled">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <svg
                      width={55}
                      height={50}
                      viewBox="0 0 55 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={55} height={50} rx={18} fill="white" />
                      <path
                        d="M38 25C38 30.52 33.52 35 28 35C22.48 35 18 30.52 18 25C18 19.48 22.48 15 28 15C33.52 15 38 19.48 38 25Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 24.5L26.5299 27L32 22"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="menu">
                      <span className="font-w500 fs-16 d-block mb-2 text-black">
                        Cancelled Orders
                      </span>
                      <h4>{orderCount?.countCancelOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12">
                <div className="card active-orders">
                  <div className="card-body d-flex align-items-center justify-content-between">
                    <svg
                      width={55}
                      height={50}
                      viewBox="0 0 55 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width={55} height={50} rx={18} fill="white" />
                      <path
                        d="M38 25C38 30.52 33.52 35 28 35C22.48 35 18 30.52 18 25C18 19.48 22.48 15 28 15C33.52 15 38 19.48 38 25Z"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M24 24.5L26.5299 27L32 22"
                        stroke="#292D32"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="menu">
                      <span className="font-w500 fs-16 d-block mb-2 text-black">
                        Active Orders
                      </span>
                      <h4>{orderCount?.countActiveOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap">
              <div className="customer-search sm-mb-0 mb-3">
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
            </div>
            <div className="row">
              <div className="col-xl-12">
                <div className="table-responsive">
                  {records.length !== 0 ? (
                    <table
                      className="table display mb-4 dataTablesCard order-table shadow-hover  card-table text-black"
                      id="example5"
                    >
                      <thead>
                        <tr>
                          <th>Order ID</th>

                          <th>Food</th>
                          <th>Payment</th>
                          <th>Status Order</th>
                          <th>Date &amp; Time</th>
                          {/* <th>Action</th> */}
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((item, index) => (
                          <tr>
                            <td>
                              #{item?.order?._id}
                              {/* {item?.order?._id.substring(
                                item?.order?._id.length - 8
                              )} */}
                            </td>
                            <td>
                              {/* {item.order.orderItems.map((order) => ( */}
                              <div className="d-flex gap-3">
                                {/* <img src="images/dish.svg" /> */}
                                <img
                                  src={`${baseurl}${item?.order?.orderItems[0]?.image}`}
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
                                    {item.order.orderItems[0]?.quantity} x{" "}
                                    {item.order.orderItems[0]?.item}
                                  </p>
                                  <p>₹ {item.order.orderItems[0]?.price?.toFixed(2)}</p>
                                  {item.order.orderItems.length !== 1 && (
                                    <h6>
                                      + {item.order.orderItems.length - 1}{" "}
                                      {item.order.orderItems.length === 2
                                        ? "Item"
                                        : "Items"}
                                    </h6>
                                  )}
                                </div>
                              </div>

                              {/* ))} */}
                            </td>
                            <td className="text-ov">
                              {item.order.totalCost.toFixed(2)}
                            </td>
                            <td>
                              {item.order.cancelStatus === 0 ? (
                                item.order.status === 1 ? (
                                  <button type="button" class="btn btn-danger">
                                    PENDING
                                  </button>
                                ) : item.order.status === 2 ? (
                                  <button type="button" class="btn btn-info">
                                    PREPARING
                                  </button>
                                ) : item.order.status === 3 ? (
                                  <button type="button" class="btn btn-warning">
                                    PREPARED
                                  </button>
                                ) : item.order.status === 4 ? (
                                  <button type="button" class="btn btn-primary">
                                    OUT FOR DELIVERY
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    className="btn btn-success"
                                  >
                                    DELIVERED
                                  </button>
                                  // <span className="btn bgl-success text-success btn-rounded btn-sm">
                                  //   DELIVERED
                                  // </span>
                                )
                              ) : (
                                <button type="button" class="btn btn-danger">
                                  Cancelled
                                </button>
                              )}
                            </td>
                            <td className="wspace-no">{item.datetime}</td>
                            <td>
                              <Link
                                to="/OrderDetails"
                                className="btn main_btn"
                                state={{ data: item }}
                              >
                                View Details
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h4>No Orders Found !</h4>
                  )}
                </div>
                {/* {load && <Loader />} */}
              </div>
              {records.length !== 0 && (
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
              {/* <div className="col-12 custom-pagination">
                <ul>
                  <li>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_559_6979)">
                        <path
                          d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_6979">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>...</li>
                  <li>99</li>
                  <li>
                    <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_559_10108)">
                        <path
                          d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_10108">
                          <rect width={24} height={24} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
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
    </>
  );
}
export default UserOrders;
