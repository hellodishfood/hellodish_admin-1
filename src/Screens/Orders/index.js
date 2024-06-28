import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { Link } from "react-router-dom";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";

const OrderList = () => {
  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {
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

    fetch(`${baseurl}admin/api/getAllOrderAdmin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          let updatedata = result.data.map((e) => ({
            ...e,
            datetime: GetDateandTime(e.order.createdAt),
          }));
          const sorted = updatedata?.sort((a, b) => {
            return new Date(b.order.createdAt) - new Date(a.order.createdAt);
          });
          setOrders(sorted);
          setOorders(sorted);
          setOrderCount(result?.orders);
          setLoad(false);
        } else {
          setLoad(false);
        }
      })
      .catch((error) => console.error(error));
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

  const [orders, setOrders] = useState([]);
  const [searchtxt, setSearchtxt] = useState("");
  const [oorders, setOorders] = useState([]);
  const [ordersCount, setOrderCount] = useState({});
  const [load, setLoad] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = orders.slice(firstIndex, lastIndex);
  const npage = Math.ceil(orders.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
      <div id="preloader">
        <div class="gooey">
          <span class="dot"></span>
          <div class="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div id="main-wrapper">
        <NavHeader />

        <div class="header">
          <div class="header-content">
            <nav class="navbar navbar-expand">
              <div class="collapse navbar-collapse justify-content-between">
                <div class="header-left">
                  <div class="nav-item">
                    <h2 class="mb-0 me-auto">Orders</h2>
                  </div>
                </div>
                <ul class="navbar-nav header-right"></ul>
              </div>
            </nav>
          </div>
        </div>

        <Slidebar />
        <div class="content-body">
          <div class="container-fluid">
            <div class="mb-sm-4 d-flex flex-wrap align-items-center text-head">
              <h2 class="mb-3 me-auto">Order List</h2>
            </div>

            <div class="row menu-page">
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card pending">
                  <div class="card-body d-flex align-items-center gap-3">
                    <div class="for-icon-order">
                      <small class="text-black ">

                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 11C21 16.52 16.52 21 11 21C5.48 21 1 16.52 1 11C1 5.48 5.48 1 11 1C16.52 1 21 5.48 21 11Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M14.7099 14.18L11.6099 12.33C11.0699 12.01 10.6299 11.24 10.6299 10.61V6.51001" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      </small>
                    </div>
                    <div class="menu">
                      <span class="font-w500 fs-16 d-block mb-2 text-black">
                        Pending Orders
                      </span>
                      <h4>{ordersCount.countPendingOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card completed">
                  <div class="card-body d-flex align-items-center gap-3">
                    <div class="for-icon-order">
                      <small class="text-black ">

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 11.5L10.5299 14L16 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      </small>
                    </div>
                    <div class="menu">
                      <span class="font-w500 fs-16 d-block mb-2 text-black">
                        Completed Orders
                      </span>
                      <h4>{ordersCount.countCompleteOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card cancelled">
                  <div class="card-body d-flex align-items-center gap-3">
                    <div class="for-icon-order">
                      <small class="text-black ">

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 11.5L10.5299 14L16 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      </small>
                    </div>
                    <div class="menu">
                      <span class="font-w500 fs-16 d-block mb-2 text-black">
                        Cancelled Orders
                      </span>
                      <h4>{ordersCount.countCancelOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-3 col-sm-6 col-12">
                <div class="card active-orders">
                  <div class="card-body d-flex align-items-center gap-3">
                    <div class="for-icon-order">
                      <small class="text-black">

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                          <path d="M8 11.5L10.5299 14L16 9" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                      </small>
                    </div>
                    <div class="menu">
                      <span class="font-w500 fs-16 d-block mb-2 text-black">
                        Active Orders
                      </span>
                      <h4>{ordersCount.countActiveOrder}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mb-4 d-flex justify-content-between align-items-center flex-wrap">
              <div class="customer-search sm-mb-0 mb-3">
                <div class="input-group search-area">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search here......"
                    value={searchtxt}
                    onChange={(event) => {
                      search(event.target.value);
                      setSearchtxt(event.target.value);
                    }}
                  />
                  <span class="input-group-text">
                    <a href="javascript:void(0)">
                      <i class="flaticon-381-search-2"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-12">
                <div class="table-responsive">
                  {records.length !== 0 ? (
                    <table
                      class="table display mb-4 dataTablesCard order-table shadow-hover  card-table text-black"
                      id="example5"
                    >
                      <thead>
                        <tr>
                          <th>Order ID</th>

                          <th>Food</th>
                          <th>Payment</th>
                          <th>Status Order</th>
                          <th>Date & Time</th>
                          <th>Action</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {records?.map((item) => (
                          <tr>
                            <td>
                              #{item.order._id}
                              {/* {item.order._id.substring(
                                item.order._id.length - 8
                              )} */}
                            </td>
                            <td>
                              <div className="d-flex gap-3">
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
                                  <p>₹ {item.order.orderItems[0]?.price}</p>
                                  {item.order.orderItems?.length !== 1 && (
                                    <h6>
                                      + {item.order.orderItems?.length - 1}{" "}
                                      {item.order.orderItems?.length === 2
                                        ? "Item"
                                        : "Items"}
                                    </h6>
                                  )}
                                </div>
                              </div>
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
                {load && <Loader />}
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
                      className={`page-item ${currentpage === num ? "active" : ""
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
          </div>
        </div>

        <div class="footer">
          <div class="copyright">
            <p>
              Copyright © Designed &amp; Developed by{" "}
              <a href="#" target="_blank">
                HelloDish
              </a>{" "}
              2024
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
