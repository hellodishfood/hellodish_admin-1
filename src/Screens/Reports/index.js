
import { Helmet } from 'react-helmet';
import { React, useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import userEvent from "@testing-library/user-event";
import { baseurl } from "../../Utilities/Api";
import { useLocation, Link } from "react-router-dom";
import Loader from "../Loader";

const Reports = () => {


  useEffect(() => {
    GetData();
  }, []);

  const [data, setData] = useState({});

  function GetData() {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      startDate: "",
      endDate: "",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          console.log(result.data);
          setData(result.data);
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <>
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
                    <div>
                      <h4>
                        <b>HelloDish</b>
                      </h4>
                      <p className="mb-0">kalavad road, rajkot</p>
                    </div>
                  </div>
                </div>
                <ul className="navbar-nav header-right">
                  <li className="nav-item">
                    <div className="card-action coin-tabs mt-3 mt-sm-0">
                      <ul className="nav nav-tabs" role="tablist">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#day"
                            role="tab"
                          >
                            Day
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#Week"
                            role="tab"
                          >
                            Week
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link active"
                            data-bs-toggle="tab"
                            href="#Month"
                            role="tab"
                          >
                            Month
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-bs-toggle="tab"
                            href="#Year"
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
                      className="nav-link ai-icon"
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
                                <h6 className="mb-1">Dr sultads Send you Photo</h6>
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
                                <h6 className="mb-1">Reminder : Treatment Time!</h6>
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
                                <h6 className="mb-1">Dr sultads Send you Photo</h6>
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
                                <h6 className="mb-1">Reminder : Treatment Time!</h6>
                                <small className="d-block">
                                  29 July 2020 - 02:26 PM
                                </small>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <a className="all-notification" href="javascript:void(0);">
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

        <Slidebar />
        {/***********************************
      Content body start
  ************************************/}
        <div className="content-body">
          {/* row */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-xl-6 col-sm-6">
                    <div className="card">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="menu">
                          <span className="font-w500 fs-16 d-block mb-2">
                            Total Menus
                          </span>
                          <h2>{data?.countItem}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                          </span>
                          <svg class="peity" height="90" width="90"><path d="M 45 0 A 45 45 0 1 1 13.180194846605364 76.81980515339464 L 20.25126265847084 69.74873734152916 A 35 35 0 1 0 45 10" data-value="5" fill="rgb(219, 29, 29)"></path><path d="M 13.180194846605364 76.81980515339464 A 45 45 0 0 1 44.99999999999999 0 L 44.99999999999999 10 A 35 35 0 0 0 20.25126265847084 69.74873734152916" data-value="3" fill="rgba(247, 245, 255)"></path></svg>
                          <small className="text-black">
                            <svg
                              width={31}
                              height={30}
                              viewBox="0 0 31 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M30.8495 7.03697H22.274V1.75781H28.5565V0H20.511V7.03697H11.9357V12.3132H13.7565L13.919 14.7549H9.2884C5.81084 14.7549 2.93817 17.3859 2.56674 20.7561C1.51859 21.1073 0.761047 22.0953 0.761047 23.2571C0.761047 24.4244 1.5257 25.4164 2.58166 25.7632C2.94436 28.1582 5.02231 30 7.5238 30H27.8522L29.0287 12.3132H30.8495V7.03697ZM9.2884 16.5127H17.0291C19.4851 16.5127 21.5318 18.2881 21.9496 20.6188H4.36785C4.78564 18.2881 6.83214 16.5127 9.2884 16.5127ZM3.40692 22.3766H22.9103C23.3972 22.3766 23.7934 22.7717 23.7934 23.2569C23.7934 23.7424 23.3972 24.1372 22.9103 24.1372H3.40692C2.92003 24.1372 2.52405 23.7424 2.52405 23.2569C2.52405 22.7717 2.92003 22.3766 3.40692 22.3766ZM7.5238 28.2422C6.04545 28.2422 4.79643 27.2479 4.41146 25.8952H21.9058C21.521 27.2479 20.272 28.2422 18.7934 28.2422H7.5238ZM26.2024 28.2422H22.599C23.1888 27.5517 23.5937 26.7002 23.7356 25.7632C24.7915 25.4164 25.5564 24.4244 25.5564 23.2571C25.5564 22.0953 24.7989 21.1073 23.7507 20.7561C23.3793 17.3859 20.5069 14.7549 17.0291 14.7549H15.6859L15.5234 12.3132H27.2618L26.2024 28.2422ZM29.0865 10.5553H13.6987V8.79478H29.0865V10.5553Z"
                                fill="#db1d1dff"
                              />
                            </svg>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-sm-6">
                    <div className="card">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="menu">
                          <span className="font-w500 fs-16 d-block mb-2">
                            Total Revenue
                          </span>
                          <h2>$87,561</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                          </span>
                          <svg class="peity" height="90" width="90"><path d="M 45 0 A 45 45 0 1 1 13.180194846605364 76.81980515339464 L 20.25126265847084 69.74873734152916 A 35 35 0 1 0 45 10" data-value="5" fill="rgb(219, 29, 29)"></path><path d="M 13.180194846605364 76.81980515339464 A 45 45 0 0 1 44.99999999999999 0 L 44.99999999999999 10 A 35 35 0 0 0 20.25126265847084 69.74873734152916" data-value="3" fill="rgba(247, 245, 255)"></path></svg>
                          <small className="text-black">
                            <svg
                              width={19}
                              height={36}
                              viewBox="0 0 19 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.8469 24.36C18.8469 25.64 18.5269 26.8667 17.8869 28.04C17.2469 29.1867 16.3003 30.1467 15.0469 30.92C13.8203 31.6933 12.3403 32.1333 10.6069 32.24V35.48H8.44695V32.24C6.02028 32.0267 4.04695 31.2533 2.52694 29.92C1.00694 28.56 0.233612 26.84 0.206945 24.76H4.08695C4.19361 25.88 4.60695 26.8533 5.32695 27.68C6.07361 28.5067 7.11361 29.0267 8.44695 29.24V19.24C6.66028 18.7867 5.22028 18.32 4.12695 17.84C3.03361 17.36 2.10028 16.6133 1.32694 15.6C0.553612 14.5867 0.166945 13.2267 0.166945 11.52C0.166945 9.36 0.913612 7.57333 2.40695 6.16C3.92695 4.74666 5.94028 3.96 8.44695 3.8V0.479998H10.6069V3.8C12.8736 3.98667 14.7003 4.72 16.0869 6C17.4736 7.25333 18.2736 8.89333 18.4869 10.92H14.6069C14.4736 9.98667 14.0603 9.14667 13.3669 8.4C12.6736 7.62667 11.7536 7.12 10.6069 6.88V16.64C12.3669 17.0933 13.7936 17.56 14.8869 18.04C16.0069 18.4933 16.9403 19.2267 17.6869 20.24C18.4603 21.2533 18.8469 22.6267 18.8469 24.36ZM3.88695 11.32C3.88695 12.6267 4.27361 13.6267 5.04695 14.32C5.82028 15.0133 6.95361 15.5867 8.44695 16.04V6.8C7.06028 6.93333 5.95361 7.38667 5.12695 8.16C4.30028 8.90667 3.88695 9.96 3.88695 11.32ZM10.6069 29.28C12.0469 29.12 13.1669 28.6 13.9669 27.72C14.7936 26.84 15.2069 25.7867 15.2069 24.56C15.2069 23.2533 14.8069 22.2533 14.0069 21.56C13.2069 20.84 12.0736 20.2667 10.6069 19.84V29.28Z"
                                fill="#db1d1dff"
                              />
                            </svg>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-sm-6">
                    <div className="card">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="menu">
                          <span className="font-w500 fs-16 d-block mb-2">
                            Total Oders
                          </span>
                          <h2>{data?.countOrder}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                          </span>
                          <svg class="peity" height="90" width="90"><path d="M 45 0 A 45 45 0 1 1 13.180194846605364 76.81980515339464 L 20.25126265847084 69.74873734152916 A 35 35 0 1 0 45 10" data-value="5" fill="rgb(219, 29, 29)"></path><path d="M 13.180194846605364 76.81980515339464 A 45 45 0 0 1 44.99999999999999 0 L 44.99999999999999 10 A 35 35 0 0 0 20.25126265847084 69.74873734152916" data-value="3" fill="rgba(247, 245, 255)"></path></svg>
                          <small className="text-black">
                            <svg
                              width={19}
                              height={36}
                              viewBox="0 0 19 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.8469 24.36C18.8469 25.64 18.5269 26.8667 17.8869 28.04C17.2469 29.1867 16.3003 30.1467 15.0469 30.92C13.8203 31.6933 12.3403 32.1333 10.6069 32.24V35.48H8.44695V32.24C6.02028 32.0267 4.04695 31.2533 2.52694 29.92C1.00694 28.56 0.233612 26.84 0.206945 24.76H4.08695C4.19361 25.88 4.60695 26.8533 5.32695 27.68C6.07361 28.5067 7.11361 29.0267 8.44695 29.24V19.24C6.66028 18.7867 5.22028 18.32 4.12695 17.84C3.03361 17.36 2.10028 16.6133 1.32694 15.6C0.553612 14.5867 0.166945 13.2267 0.166945 11.52C0.166945 9.36 0.913612 7.57333 2.40695 6.16C3.92695 4.74666 5.94028 3.96 8.44695 3.8V0.479998H10.6069V3.8C12.8736 3.98667 14.7003 4.72 16.0869 6C17.4736 7.25333 18.2736 8.89333 18.4869 10.92H14.6069C14.4736 9.98667 14.0603 9.14667 13.3669 8.4C12.6736 7.62667 11.7536 7.12 10.6069 6.88V16.64C12.3669 17.0933 13.7936 17.56 14.8869 18.04C16.0069 18.4933 16.9403 19.2267 17.6869 20.24C18.4603 21.2533 18.8469 22.6267 18.8469 24.36ZM3.88695 11.32C3.88695 12.6267 4.27361 13.6267 5.04695 14.32C5.82028 15.0133 6.95361 15.5867 8.44695 16.04V6.8C7.06028 6.93333 5.95361 7.38667 5.12695 8.16C4.30028 8.90667 3.88695 9.96 3.88695 11.32ZM10.6069 29.28C12.0469 29.12 13.1669 28.6 13.9669 27.72C14.7936 26.84 15.2069 25.7867 15.2069 24.56C15.2069 23.2533 14.8069 22.2533 14.0069 21.56C13.2069 20.84 12.0736 20.2667 10.6069 19.84V29.28Z"
                                fill="#db1d1dff"
                              />
                            </svg>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-6 col-sm-6">
                    <div className="card">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="menu">
                          <span className="font-w500 fs-16 d-block mb-2">
                            Total Customers
                          </span>
                          <h2>{data?.countUsers}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >

                          </span>
                          <svg class="peity" height="90" width="90"><path d="M 45 0 A 45 45 0 1 1 13.180194846605364 76.81980515339464 L 20.25126265847084 69.74873734152916 A 35 35 0 1 0 45 10" data-value="5" fill="rgb(219, 29, 29)"></path><path d="M 13.180194846605364 76.81980515339464 A 45 45 0 0 1 44.99999999999999 0 L 44.99999999999999 10 A 35 35 0 0 0 20.25126265847084 69.74873734152916" data-value="3" fill="rgba(247, 245, 255)"></path></svg>
                          <small className="text-black">
                            <svg
                              width={32}
                              height={36}
                              viewBox="0 0 32 36"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11.0444 19.25C12.0362 19.25 13.0057 18.9568 13.8304 18.4074C14.6551 17.8579 15.2978 17.0771 15.6774 16.1634C16.0569 15.2498 16.1563 14.2445 15.9628 13.2746C15.7693 12.3046 15.2917 11.4137 14.5903 10.7145C13.889 10.0152 12.9955 9.539 12.0227 9.34608C11.0499 9.15315 10.0416 9.25217 9.12531 9.6306C8.20899 10.009 7.42579 10.6499 6.87476 11.4722C6.32374 12.2944 6.02962 13.2611 6.02962 14.25C6.03092 15.5757 6.55967 16.8467 7.49984 17.7841C8.44001 18.7215 9.71478 19.2487 11.0444 19.25ZM11.0444 11.75C11.5403 11.75 12.0251 11.8966 12.4374 12.1713C12.8497 12.446 13.1711 12.8365 13.3609 13.2933C13.5507 13.7501 13.6003 14.2528 13.5036 14.7377C13.4068 15.2227 13.168 15.6681 12.8174 16.0178C12.4667 16.3674 12.0199 16.6055 11.5335 16.702C11.0472 16.7984 10.543 16.7489 10.0848 16.5597C9.62668 16.3705 9.23508 16.0501 8.95957 15.6389C8.68405 15.2278 8.537 14.7445 8.537 14.25C8.53789 13.5872 8.80235 12.9519 9.27238 12.4832C9.74241 12.0146 10.3797 11.7509 11.0444 11.75Z"
                                fill="#db1d1dff"
                              />
                              <path
                                d="M30.632 22.4625C31.0458 21.9098 31.3223 21.2672 31.4388 20.5873C31.5552 19.9074 31.5082 19.2097 31.3017 18.5514L30.5058 15.9696C30.1322 14.7451 29.3726 13.6733 28.3398 12.9132C27.307 12.1531 26.0559 11.7452 24.7722 11.75H19.1468C18.8143 11.75 18.4954 11.8817 18.2603 12.1161C18.0252 12.3505 17.8931 12.6685 17.8931 13C17.8931 13.3315 18.0252 13.6495 18.2603 13.8839C18.4954 14.1183 18.8143 14.25 19.1468 14.25H24.7722C25.5192 14.2474 26.2471 14.485 26.8481 14.9274C27.449 15.3698 27.891 15.9935 28.1084 16.706L28.9043 19.2866C28.9921 19.5713 29.0117 19.8725 28.9615 20.1661C28.9114 20.4597 28.7928 20.7374 28.6154 20.977C28.438 21.2166 28.2067 21.4114 27.9401 21.5456C27.6735 21.6799 27.379 21.7499 27.0803 21.75H15.5853C15.5499 21.75 15.5201 21.7671 15.485 21.7701C15.4008 21.7669 15.3194 21.75 15.2339 21.75H7.37331C5.98015 21.7449 4.62249 22.1879 3.50187 23.0132C2.38125 23.8385 1.55741 25.0021 1.15264 26.3312L0.216641 29.3625C-0.00199068 30.0719 -0.0506583 30.8225 0.0745503 31.554C0.199759 32.2856 0.495352 32.9776 0.937568 33.5746C1.37979 34.1715 1.95629 34.6567 2.62075 34.9911C3.28521 35.3255 4.01908 35.4998 4.76339 35.5H17.843C18.5873 35.4999 19.3213 35.3256 19.9858 34.9912C20.6503 34.6569 21.2269 34.1717 21.6691 33.5748C22.1114 32.9778 22.4071 32.2857 22.5323 31.5542C22.6575 30.8226 22.6089 30.0719 22.3902 29.3625L21.4548 26.3315C21.2179 25.5767 20.8448 24.8713 20.354 24.25H27.0803C27.7718 24.2532 28.4543 24.0928 29.0717 23.7821C29.6891 23.4714 30.2238 23.0192 30.632 22.4625ZM19.6524 32.089C19.4445 32.3726 19.1721 32.6031 18.8576 32.7614C18.543 32.9198 18.1953 33.0015 17.843 33H4.76339C4.41135 32.9999 4.06424 32.9175 3.74996 32.7594C3.43569 32.6012 3.16303 32.3717 2.95391 32.0894C2.7448 31.807 2.60506 31.4796 2.54595 31.1336C2.48684 30.7876 2.51 30.4326 2.61357 30.0971L3.54894 27.0661C3.79744 26.2489 4.30376 25.5335 4.99265 25.0261C5.68155 24.5188 6.51624 24.2466 7.37269 24.25H15.2333C16.0897 24.2466 16.9244 24.5188 17.6133 25.0261C18.3022 25.5335 18.8085 26.2489 19.057 27.0661L19.9924 30.0971C20.0979 30.4323 20.1221 30.7877 20.063 31.134C20.0039 31.4804 19.8632 31.8078 19.6524 32.0894V32.089Z"
                                fill="#db1d1dff"
                              />
                              <path
                                d="M21.7007 9.24999C22.5685 9.24999 23.4169 8.9934 24.1385 8.51267C24.8601 8.03194 25.4225 7.34866 25.7546 6.54923C26.0867 5.74981 26.1736 4.87014 26.0043 4.02148C25.835 3.17281 25.4171 2.39326 24.8034 1.78141C24.1898 1.16955 23.4079 0.752876 22.5567 0.584066C21.7056 0.415256 20.8233 0.501896 20.0215 0.833029C19.2197 1.16416 18.5344 1.72492 18.0523 2.44438C17.5702 3.16384 17.3128 4.0097 17.3128 4.875C17.3142 6.03489 17.7769 7.14688 18.5995 7.96705C19.4221 8.78722 20.5374 9.2486 21.7007 9.24999ZM21.7007 3C22.0726 3 22.4362 3.10997 22.7455 3.31599C23.0547 3.52202 23.2958 3.81485 23.4381 4.15747C23.5804 4.50008 23.6177 4.87708 23.5451 5.24079C23.4725 5.6045 23.2934 5.9386 23.0304 6.20082C22.7674 6.46304 22.4324 6.64162 22.0676 6.71397C21.7028 6.78631 21.3247 6.74918 20.9811 6.60727C20.6374 6.46535 20.3437 6.22503 20.1371 5.91669C19.9305 5.60835 19.8202 5.24584 19.8202 4.875C19.8207 4.37789 20.019 3.9013 20.3716 3.54979C20.7241 3.19829 21.2024 3.00056 21.7007 3Z"
                                fill="#db1d1dff"
                              />
                            </svg>
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="card">
                  <div className="card-header border-0 flex-wrap pb-0">
                    <div className="mb-sm-0 mb-2">
                      <h4 className="fs-20">Today’s Revenue</h4>
                      <span>Lorem ipsum dolor sit amet, consectetur</span>
                    </div>
                    <div>
                      <h2 className="font-w700 mb-0">$ 240.45</h2>
                      <p className="mb-0 font-w700">
                        <span className="text-success">0,5% </span>than last day
                      </p>
                    </div>
                  </div>
                  <div className="card-body py-0">
                    <div id="revenueChart" className="revenueChart" />
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Total Revenue</h4>
                  </div>
                  <div className="card-body">
                    <div
                      id="line_chart_2"
                      className="morris_chart_height"
                      style={{
                        position: "relative",
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)"
                      }}
                    >
                      <svg
                        height={240}
                        version="1.1"
                        width="513.162"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        style={{
                          overflow: "hidden",
                          position: "relative",
                          left: "-0.787537px",
                          top: "-0.862488px"
                        }}
                      >
                        <desc
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        >
                          Created with Raphaël 2.2.0
                        </desc>
                        <defs
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <text
                          x="32.52499961853027"
                          y="201.39999961853027"
                          textAnchor="end"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "end",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            0
                          </tspan>
                        </text>
                        <path
                          fill="none"
                          stroke="#000000"
                          d="M45.02499961853027,201.39999961853027H488.16200000000003"
                          strokeOpacity={0}
                          strokeWidth="0.5"
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <text
                          x="32.52499961853027"
                          y="157.2999997138977"
                          textAnchor="end"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "end",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399993419647217"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            50
                          </tspan>
                        </text>
                        <path
                          fill="none"
                          stroke="#000000"
                          d="M45.02499961853027,157.2999997138977H488.16200000000003"
                          strokeOpacity={0}
                          strokeWidth="0.5"
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <text
                          x="32.52499961853027"
                          y="113.19999980926514"
                          textAnchor="end"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "end",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399999618530273"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            100
                          </tspan>
                        </text>
                        <path
                          fill="none"
                          stroke="#000000"
                          d="M45.02499961853027,113.19999980926514H488.16200000000003"
                          strokeOpacity={0}
                          strokeWidth="0.5"
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <text
                          x="32.52499961853027"
                          y="69.09999990463257"
                          textAnchor="end"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "end",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399998188018799"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            150
                          </tspan>
                        </text>
                        <path
                          fill="none"
                          stroke="#000000"
                          d="M45.02499961853027,69.09999990463257H488.16200000000003"
                          strokeOpacity={0}
                          strokeWidth="0.5"
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <text
                          x="32.52499961853027"
                          y={25}
                          textAnchor="end"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "end",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399999618530273"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            200
                          </tspan>
                        </text>
                        <path
                          fill="none"
                          stroke="#000000"
                          d="M45.02499961853027,25H488.16200000000003"
                          strokeOpacity={0}
                          strokeWidth="0.5"
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <text
                          x="488.16200000000003"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2007
                          </tspan>
                        </text>
                        <text
                          x="414.33954215461597"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2006
                          </tspan>
                        </text>
                        <text
                          x="340.5170843092319"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2005
                          </tspan>
                        </text>
                        <text
                          x="266.49237315468247"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2004
                          </tspan>
                        </text>
                        <text
                          x="192.66991530929837"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2003
                          </tspan>
                        </text>
                        <text
                          x="118.84745746391432"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2002
                          </tspan>
                        </text>
                        <text
                          x="45.02499961853027"
                          y="213.89999961853027"
                          textAnchor="middle"
                          fontFamily="sans-serif"
                          fontSize="12px"
                          stroke="none"
                          fill="#888888"
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            textAnchor: "middle",
                            fontFamily: "sans-serif",
                            fontSize: 12,
                            fontWeight: "normal"
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                          >
                            2001
                          </tspan>
                        </text>
                        <path
                          fill="#ec7979"
                          stroke="none"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,181.5549996614456,100.39184300256831,126.4299997806549,118.84745746391432,122.01999979019165C137.30307192526033,117.6099997997284,174.21430084795236,159.50499970912935,192.66991530929837,166.11999969482423C211.1255297706444,172.7349996805191,248.03675869333645,187.05090936228288,266.49237315468247,174.93999967575073C284.99855094331986,162.79590941473495,322.0109065205945,68.54799580185912,340.5170843092319,69.09999990463257C358.97269877057795,69.65049579947494,395.8839276932699,163.91499969959258,414.33954215461597,179.349999666214C432.795156615962,194.7849996328354,469.706385538654,189.2724996447563,488.16200000000003,192.57999963760375L488.16200000000003,201.39999961853027L45.02499961853027,201.39999961853027Z"
                          fillOpacity={0}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            fillOpacity: 0
                          }}
                        />
                        <path
                          fill="none"
                          stroke="#ee3c3c"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,181.5549996614456,100.39184300256831,126.4299997806549,118.84745746391432,122.01999979019165C137.30307192526033,117.6099997997284,174.21430084795236,159.50499970912935,192.66991530929837,166.11999969482423C211.1255297706444,172.7349996805191,248.03675869333645,187.05090936228288,266.49237315468247,174.93999967575073C284.99855094331986,162.79590941473495,322.0109065205945,68.54799580185912,340.5170843092319,69.09999990463257C358.97269877057795,69.65049579947494,395.8839276932699,163.91499969959258,414.33954215461597,179.349999666214C432.795156615962,194.7849996328354,469.706385538654,189.2724996447563,488.16200000000003,192.57999963760375"
                          strokeWidth={3}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        ></path>
                        <circle
                          cx="45.02499961853027"
                          cy="201.39999961853027"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="118.84745746391432"
                          cy="122.01999979019165"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="192.66991530929837"
                          cy="166.11999969482423"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="266.49237315468247"
                          cy="174.93999967575073"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="340.5170843092319"
                          cy="69.09999990463257"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="414.33954215461597"
                          cy="179.349999666214"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="488.16200000000003"
                          cy="192.57999963760375"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <path
                          fill="#0cc4e1"
                          stroke="none"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,188.16999964714051,100.39184300256831,157.2999997138977,118.84745746391432,148.47999973297118C137.30307192526033,139.65999975204465,174.21430084795236,129.4067497742176,192.66991530929837,130.83999977111816C211.1255297706444,132.27324976801873,248.03675869333645,155.5420325494367,266.49237315468247,159.94599970817566C284.99855094331986,164.36203253036322,322.0109065205945,169.76322677312896,340.5170843092319,166.11999969482423C358.97269877057795,162.4867267888646,395.8839276932699,127.53249977827072,414.33954215461597,130.83999977111816C432.795156615962,134.14749976396558,469.706385538654,177.14499967098234,488.16200000000003,192.57999963760375L488.16200000000003,201.39999961853027L45.02499961853027,201.39999961853027Z"
                          fillOpacity={0}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            fillOpacity: 0
                          }}
                        />
                        <path
                          fill="none"
                          stroke="#00abc5"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,188.16999964714051,100.39184300256831,157.2999997138977,118.84745746391432,148.47999973297118C137.30307192526033,139.65999975204465,174.21430084795236,129.4067497742176,192.66991530929837,130.83999977111816C211.1255297706444,132.27324976801873,248.03675869333645,155.5420325494367,266.49237315468247,159.94599970817566C284.99855094331986,164.36203253036322,322.0109065205945,169.76322677312896,340.5170843092319,166.11999969482423C358.97269877057795,162.4867267888646,395.8839276932699,127.53249977827072,414.33954215461597,130.83999977111816C432.795156615962,134.14749976396558,469.706385538654,177.14499967098234,488.16200000000003,192.57999963760375"
                          strokeWidth={3}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        ></path>
                        <circle
                          cx="45.02499961853027"
                          cy="201.39999961853027"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="118.84745746391432"
                          cy="148.47999973297118"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="192.66991530929837"
                          cy="130.83999977111816"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="266.49237315468247"
                          cy="159.94599970817566"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="340.5170843092319"
                          cy="166.11999969482423"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="414.33954215461597"
                          cy="130.83999977111816"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="488.16200000000003"
                          cy="192.57999963760375"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <path
                          fill="#f79c83"
                          stroke="none"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,195.8874996304512,100.39184300256831,183.20874965786933,118.84745746391432,179.349999666214C137.30307192526033,175.49124967455865,174.21430084795236,169.6479996871948,192.66991530929837,170.52999968528746C211.1255297706444,171.41199968338012,248.03675869333645,195.7644298632755,266.49237315468247,186.4059996509552C284.99855094331986,177.02192990380667,322.0109065205945,98.09921872016994,340.5170843092319,95.5599998474121C358.97269877057795,93.0277187311372,395.8839276932699,153.99249972105028,414.33954215461597,166.11999969482423C432.795156615962,178.24749966859818,469.706385538654,185.96499965190887,488.16200000000003,192.57999963760375L488.16200000000003,201.39999961853027L45.02499961853027,201.39999961853027Z"
                          fillOpacity={0}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            fillOpacity: 0
                          }}
                        />
                        <path
                          fill="none"
                          stroke="#fd683e"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,195.8874996304512,100.39184300256831,183.20874965786933,118.84745746391432,179.349999666214C137.30307192526033,175.49124967455865,174.21430084795236,169.6479996871948,192.66991530929837,170.52999968528746C211.1255297706444,171.41199968338012,248.03675869333645,195.7644298632755,266.49237315468247,186.4059996509552C284.99855094331986,177.02192990380667,322.0109065205945,98.09921872016994,340.5170843092319,95.5599998474121C358.97269877057795,93.0277187311372,395.8839276932699,153.99249972105028,414.33954215461597,166.11999969482423C432.795156615962,178.24749966859818,469.706385538654,185.96499965190887,488.16200000000003,192.57999963760375"
                          strokeWidth={3}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        ></path>
                        <circle
                          cx="45.02499961853027"
                          cy="201.39999961853027"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="118.84745746391432"
                          cy="179.349999666214"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="192.66991530929837"
                          cy="170.52999968528746"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="266.49237315468247"
                          cy="186.4059996509552"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="340.5170843092319"
                          cy="95.5599998474121"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="414.33954215461597"
                          cy="166.11999969482423"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                        <circle
                          cx="488.16200000000003"
                          cy="192.57999963760375"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{ WebkitTapHighlightColor: "rgba(0, 0, 0, 0)" }}
                        />
                      </svg>
                      <div
                        className="morris-hover morris-default-style"
                        style={{ left: "131.414px", top: 63, display: "none" }}
                      >
                        <div className="morris-hover-row-label">2003</div>
                        <div
                          className="morris-hover-point"
                          style={{ color: "rgb(238, 60, 60)" }}
                        >
                          Phone: 40
                        </div>
                        <div
                          className="morris-hover-point"
                          style={{ color: "rgb(0, 171, 197)" }}
                        >
                          Windows: 80
                        </div>
                        <div
                          className="morris-hover-point"
                          style={{ color: "#fd683e" }}
                        >
                          Mac: 35
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-xxl-6">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div class="card-header border-0  flex-wrap">
                        <div>
                          <h4 class="fs-20 mb-1">Customer Map</h4>
                        </div>
                        <div class="d-flex">
                          <div class="card-action coin-tabs mt-3 mt-sm-0">
                            <ul class="nav nav-tabs" role="tablist">
                              <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="tab" href="#Monthly"
                                  role="tab">Monthly</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link " data-bs-toggle="tab" href="#Daily"
                                  role="tab">Daily</a>
                              </li>
                              <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="tab" href="#Today"
                                  role="tab">Today</a>
                              </li>
                            </ul>
                          </div>
                          <div class="dropdown custom-dropdown mb-0 ms-3">
                            <div class="btn sharp tp-btn dark-btn" data-bs-toggle="dropdown">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
                                  stroke="#2E2E2E" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path
                                  d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z"
                                  stroke="#2E2E2E" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round" />
                                <path
                                  d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z"
                                  stroke="#2E2E2E" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round" />
                              </svg>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right">
                              <a class="dropdown-item" href="javascript:void(0);">Details</a>
                              <a class="dropdown-item text-danger"
                                href="javascript:void(0);">Cancel</a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pb-2">
                        <div className="tab-content">
                          <div className="tab-pane fade show active" id="Monthly">
                            <div id="chartTimeline1" className="chart-timeline" />
                          </div>
                          <div className="tab-pane fade" id="Daily">
                            <div id="chartTimeline2" className="chart-timeline" />
                          </div>
                          <div className="tab-pane fade" id="Today">
                            <div id="chartTimeline3" className="chart-timeline" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
      {/* Chart Morris plugin files */}
      {/*  */}
      {/*  */}
      {/* Chart piety plugin files */}
      {/* Dashboard 1 */}
    </>
  );
};

export default Reports;


