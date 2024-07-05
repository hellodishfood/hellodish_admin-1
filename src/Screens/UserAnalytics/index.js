import { React, useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { useLocation, Link } from "react-router-dom";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";
import {
  DayModal,
  MonthModal,
  WeekModal,
  YearModal,
} from "../../Utilities/Modals";

function UserAnalytics() {
  const location = useLocation();
  const data = location?.state?.data;
  const [load, setLoad] = useState(false);
  const [data1, setData1] = useState([]);
  const [sdate, setSdate] = useState("");
  const [edate, setEdate] = useState("");
  const [date, setDate] = useState("");
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [selected, setSelected] = useState("");
  useEffect(() => {
    GetAnalytic();
  }, []);
  const customStyles = `
  .modal-header {
    background: #d32f2f;
    color: white;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 10px 20px; /* Reduced padding */
  }

  .modal-title {
    margin: 0;
    font-size: 1.5rem; /* Reduced font size */
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  }

  .modal-body {
    padding: 15px; /* Reduced padding */
    background-color: #f9f9f9;
    border-radius: 5px; /* Reduced border radius */
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }

  .modal-footer {
    padding: 10px 20px; /* Reduced padding */
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .btn-primary {
    background-color: #4caf50;
    border-color: #4caf50;
    color: white;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    font-size: 0.9rem; /* Reduced font size */
    padding: 5px 10px; /* Reduced padding */
    border-radius: 3px; /* Reduced border radius */
  }

  .btn-primary:hover {
    background-color: #45a049;
    
    border-color: #45a049;
  }

  .btn-secondary {
    background-color: #757575;
    border-color: #757575;
    color: white;
    transition: background-color 0.3s ease, border-color 0.3s ease, color 0.3s ease;
    font-size: 0.9rem; /* Reduced font size */
    padding: 5px 10px; /* Reduced padding */
    border-radius: 3px; /* Reduced border radius */
  }

  .btn-secondary:hover {
    background-color: #616161;
    border-color: #616161;
  }

  .react-calendar {
    width: 90%; /* Reduced width */
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  .react-calendar__tile {
    padding: 7px; /* Reduced padding */
    background: #ffffff;
    border-radius: 15px; /* Reduced border radius */
    margin: 3px; /* Reduced margin */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3px; /* Add gap between elements inside the tile */
    font-size: 0.85rem; /* Reduced font size */
  }

  .react-calendar__tile--now {
    background: #f57c00;
    color: white;
  }

  .react-calendar__tile--active {
    background: #4caf50;
    color: white;
  }

  .react-calendar__tile--active:hover {
    background: #45a049;
  }
`;
  const GetAnalytic = () => {
    setLoad(true);
    // const token = await localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      startDate: sdate,
      endDate: edate,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/getReports/2/${data?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          console.log(result.data);
          setData1(result.data);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };
  const GetData2 = (type) => {
    setLoad(true);
    // const token = await localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    let raw;

    if (type === "day") {
      raw = JSON.stringify({
        startDate: date,
        endDate: date,
      });
    } else if (type === "week") {
      raw = JSON.stringify({
        startDate: week[0],
        endDate: week[1],
      });
    } else if (type === "month") {
      raw = JSON.stringify({
        startDate: month[0],
        endDate: month[1],
      });
    } else if (type === "year") {
      raw = JSON.stringify({
        startDate: year[0],
        endDate: year[1],
      });
    }

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/getReports/2/${data?._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          console.log(result.data);
          setData1(result.data);
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
        <div className="nav-header">
          <a href="index.html" className="brand-logo">
          
<svg width="100" height="128" viewBox="0 0 100 128" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.588 107.691H21.487L21.253 109.581C21.253 109.581 21.253 109.584 21.253 109.59C21.253 109.596 21.253 109.602 21.253 109.608L21.226 109.851L21.1 110.868L21.064 111.111L21.028 111.462L20.992 111.705L20.974 111.903L20.947 112.092V112.119V112.128L20.938 112.182L20.866 112.758L20.848 112.875L20.713 114.018H18.805L18.814 113.982L18.913 113.154L19.039 112.128L19.12 111.498V111.48H15.916L15.862 111.93L15.601 114.018H13.702L13.945 112.002L14.323 108.978L13.441 107.718H16.375L16.321 108.213L16.15 109.608L16.114 109.851L16.105 109.959L15.988 110.004L15.439 110.22H19.273V110.202L19.282 110.184V110.175V110.166L19.318 109.851V109.842L19.345 109.608L19.426 108.951L19.453 108.753L19.48 108.51L19.579 107.718L19.588 107.691ZM21.9444 107.7H28.7304C28.9044 107.7 29.0574 107.724 29.1894 107.772C29.3214 107.82 29.4264 107.883 29.5044 107.961C29.5824 108.033 29.6454 108.114 29.6934 108.204C29.7474 108.288 29.7834 108.375 29.8014 108.465C29.8194 108.555 29.8314 108.639 29.8374 108.717C29.8434 108.789 29.8434 108.849 29.8374 108.897L29.8284 108.96L29.7654 109.482C29.7594 109.512 29.7564 109.548 29.7564 109.59H24.0234L24.6174 109.833L24.5724 110.22H27.1374L26.9844 111.48H24.4194L24.3924 111.723L24.3834 111.759L24.3654 111.876V111.912L24.3384 112.11H29.4504L29.3694 112.74C29.3634 112.776 29.3544 112.824 29.3424 112.884C29.3304 112.938 29.2914 113.037 29.2254 113.181C29.1654 113.325 29.0874 113.454 28.9914 113.568C28.9014 113.676 28.7634 113.775 28.5774 113.865C28.3974 113.955 28.1904 114 27.9564 114H22.2054L22.3044 113.172L22.8264 108.96L21.9444 107.7ZM30.2282 107.7H33.1622L33.1082 108.195L32.9372 109.59L32.9012 109.833L32.8562 110.211L32.7032 111.462L32.6492 111.912L32.6222 112.11H36.9152L36.8342 112.74L36.6812 114H30.4892L30.7322 111.993L31.1102 108.96L30.2282 107.7ZM37.5014 107.7H40.4354L40.3814 108.195L40.2104 109.59L40.1744 109.833L40.1294 110.211L39.9764 111.462L39.9224 111.912L39.8954 112.11H44.1884L44.1074 112.74L43.9544 114H37.7624L38.0054 111.993L38.3834 108.96L37.5014 107.7ZM46.3765 107.7H46.6285H51.0205C51.1945 107.7 51.3475 107.724 51.4795 107.772C51.6175 107.82 51.7225 107.883 51.7945 107.961C51.8725 108.033 51.9355 108.114 51.9835 108.204C52.0375 108.288 52.0735 108.375 52.0915 108.465C52.1095 108.555 52.1215 108.639 52.1275 108.717C52.1335 108.789 52.1335 108.849 52.1275 108.897V108.96L52.0645 109.482C52.0585 109.512 52.0525 109.548 52.0465 109.59L52.0195 109.833L51.8935 110.85L51.8665 111.093L51.7405 112.11L51.6595 112.74C51.6535 112.776 51.6445 112.824 51.6325 112.884C51.6205 112.938 51.5815 113.037 51.5155 113.181C51.4555 113.325 51.3805 113.454 51.2905 113.568C51.2005 113.676 51.0625 113.775 50.8765 113.865C50.6905 113.955 50.4805 114 50.2465 114H45.7555C45.5875 114 45.4375 113.979 45.3055 113.937C45.1735 113.889 45.0685 113.832 44.9905 113.766C44.9185 113.694 44.8555 113.613 44.8015 113.523C44.7475 113.427 44.7115 113.34 44.6935 113.262C44.6755 113.184 44.6605 113.103 44.6485 113.019C44.6425 112.929 44.6395 112.869 44.6395 112.839C44.6455 112.803 44.6485 112.773 44.6485 112.749L44.8465 111.183L44.9275 110.517L44.9815 110.067L45.1165 108.96L45.1345 108.816L45.1435 108.708C45.1615 108.618 45.1855 108.534 45.2155 108.456C45.2455 108.378 45.2905 108.291 45.3505 108.195C45.4165 108.099 45.4915 108.018 45.5755 107.952C45.6595 107.88 45.7705 107.82 45.9085 107.772C46.0465 107.724 46.2025 107.7 46.3765 107.7ZM46.3135 109.59L46.9075 109.833L46.8625 110.22L46.7545 111.156L46.7185 111.381L46.7095 111.48L46.6825 111.723L46.6555 111.921L46.6285 112.11H50.4625L49.8685 111.867L49.9135 111.48L50.0665 110.22L50.1475 109.59H46.3135ZM52.6894 107.736H53.5714H59.4754C59.6494 107.736 59.8024 107.76 59.9344 107.808C60.0664 107.85 60.1714 107.91 60.2494 107.988C60.3274 108.06 60.3904 108.141 60.4384 108.231C60.4924 108.321 60.5284 108.411 60.5464 108.501C60.5644 108.591 60.5764 108.672 60.5824 108.744C60.5884 108.816 60.5884 108.876 60.5824 108.924L60.5734 108.996L60.5104 109.509C60.5044 109.545 60.5014 109.584 60.5014 109.626L60.4744 109.869L60.3484 110.886L60.3124 111.129L60.1954 112.137L60.1144 112.767C60.1084 112.803 60.0994 112.851 60.0874 112.911C60.0754 112.965 60.0364 113.064 59.9704 113.208C59.9104 113.352 59.8324 113.481 59.7364 113.595C59.6464 113.703 59.5084 113.802 59.3224 113.892C59.1424 113.982 58.9354 114.027 58.7014 114.027H52.9504L53.5714 108.996L52.6894 107.736ZM54.7684 109.626L55.3624 109.86L55.3174 110.256L55.2004 111.183L55.1734 111.417L55.1644 111.516L55.1374 111.75L55.1104 111.948L55.0834 112.137H58.2874L58.3684 111.516L58.5214 110.256L58.5934 109.626H54.7684ZM61.1313 107.7H64.0653L64.0113 108.195L63.8403 109.59L63.8043 109.833L63.7593 110.211L63.6063 111.462L63.5523 111.912L63.4713 112.578L63.2913 114H61.3923L61.6353 111.993L62.0133 108.96L61.1313 107.7ZM66.9044 107.691H67.4444H71.2964C71.4644 107.691 71.6144 107.715 71.7464 107.763C71.8784 107.805 71.9834 107.862 72.0614 107.934C72.1394 108 72.2024 108.081 72.2504 108.177C72.3044 108.267 72.3404 108.351 72.3584 108.429C72.3824 108.507 72.3974 108.591 72.4034 108.681C72.4094 108.771 72.4094 108.831 72.4034 108.861C72.4034 108.891 72.4034 108.918 72.4034 108.942L72.3674 109.194L72.3314 109.464C72.3254 109.5 72.3224 109.536 72.3224 109.572V109.581L72.2954 109.824H72.2864H70.3874L70.4144 109.581H66.5894L67.1834 109.815L67.1384 110.202H70.9814C71.1554 110.202 71.3084 110.226 71.4404 110.274C71.5724 110.322 71.6774 110.385 71.7554 110.463C71.8334 110.535 71.8964 110.616 71.9444 110.706C71.9984 110.79 72.0344 110.877 72.0524 110.967C72.0704 111.057 72.0824 111.141 72.0884 111.219C72.0944 111.291 72.0974 111.351 72.0974 111.399L72.0884 111.462L72.0164 112.092L71.9714 112.407L71.9354 112.722C71.9294 112.758 71.9204 112.806 71.9084 112.866C71.8964 112.92 71.8574 113.019 71.7914 113.163C71.7314 113.307 71.6534 113.436 71.5574 113.55C71.4674 113.658 71.3294 113.757 71.1434 113.847C70.9634 113.937 70.7564 113.982 70.5224 113.982H66.0314C65.8634 113.982 65.7134 113.961 65.5814 113.919C65.4494 113.871 65.3444 113.814 65.2664 113.748C65.1884 113.682 65.1224 113.601 65.0684 113.505C65.0204 113.409 64.9844 113.322 64.9604 113.244C64.9424 113.166 64.9304 113.085 64.9244 113.001C64.9184 112.911 64.9154 112.851 64.9154 112.821C64.9214 112.791 64.9244 112.764 64.9244 112.74L65.0144 111.984L65.0324 111.84H66.9404L66.9314 111.903L66.9044 112.092H70.7384L70.1354 111.858L70.1894 111.462H66.3374C66.1694 111.462 66.0164 111.441 65.8784 111.399C65.7464 111.351 65.6414 111.291 65.5634 111.219C65.4914 111.141 65.4284 111.057 65.3744 110.967C65.3264 110.877 65.2934 110.79 65.2754 110.706C65.2574 110.616 65.2424 110.535 65.2304 110.463C65.2244 110.385 65.2244 110.322 65.2304 110.274L65.2394 110.211L65.2574 110.058L65.3564 109.203L65.3924 108.951L64.5104 107.691H66.6434H66.9044ZM79.0738 107.691H80.9728L80.7388 109.581C80.7388 109.581 80.7388 109.584 80.7388 109.59C80.7388 109.596 80.7388 109.602 80.7388 109.608L80.7118 109.851L80.5858 110.868L80.5498 111.111L80.5138 111.462L80.4778 111.705L80.4598 111.903L80.4328 112.092V112.119V112.128L80.4238 112.182L80.3518 112.758L80.3338 112.875L80.1988 114.018H78.2908L78.2998 113.982L78.3988 113.154L78.5248 112.128L78.6058 111.498V111.48H75.4018L75.3478 111.93L75.0868 114.018H73.1878L73.4308 112.002L73.8088 108.978L72.9268 107.718H75.8608L75.8068 108.213L75.6358 109.608L75.5998 109.851L75.5908 109.959L75.4738 110.004L74.9248 110.22H78.7588V110.202L78.7678 110.184V110.175V110.166L78.8038 109.851V109.842L78.8308 109.608L78.9118 108.951L78.9388 108.753L78.9658 108.51L79.0648 107.718L79.0738 107.691Z" fill="#DB1D1D"/>
<circle cx="50" cy="50" r="41" fill="#DB1D1D"/>
<path d="M50 73V88" stroke="white" stroke-width="6.6" stroke-linecap="square"/>
<path d="M98.1697 62.4397C98.3034 62.4742 98.4398 62.3938 98.4736 62.2599C100.387 54.6933 100.503 46.7826 98.811 39.1611C97.1005 31.4582 93.5913 24.2695 88.5702 18.1827C83.5491 12.0959 77.1587 7.28391 69.9215 4.14008C62.6844 0.996255 54.8059 -0.390115 46.9303 0.0943222C39.0546 0.57876 31.4054 2.92025 24.6081 6.92735C17.8108 10.9345 12.0584 16.4934 7.82111 23.1497C3.58384 29.8059 0.982078 37.3705 0.22853 45.225C-0.517055 52.9964 0.567675 60.8333 3.39433 68.1083C3.44434 68.237 3.58961 68.3001 3.71806 68.2495C3.8465 68.1989 3.90948 68.0536 3.85948 67.9249C1.06177 60.7233 -0.0118052 52.9657 0.726245 45.2727C1.47226 37.4968 4.04801 30.0079 8.2429 23.4182C12.4378 16.8285 18.1327 11.3251 24.8621 7.35808C31.5914 3.39105 39.1641 1.07297 46.961 0.593379C54.7578 0.113786 62.5575 1.48629 69.7223 4.59868C76.8871 7.71107 83.2136 12.475 88.1845 18.5009C93.1554 24.5268 96.6295 31.6436 98.3229 39.2695C99.9982 46.8139 99.8835 54.6447 97.9895 62.1349C97.9557 62.2688 98.036 62.4052 98.1697 62.4397Z" fill="#DB1D1D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M45.7637 51.9761C44.383 51.9761 43.2637 50.8568 43.2637 49.4761L43.2637 26H43C41.3431 26 40 27.3431 40 29V62.1099C40 67.4153 44.3009 71.7162 49.6063 71.7162C54.9117 71.7162 59.2126 67.4153 59.2126 62.1099V29C59.2126 27.3431 57.8695 26 56.2126 26H55.9487V49.4761C55.9487 50.8568 54.8294 51.9761 53.4487 51.9761C52.068 51.9761 50.9487 50.8568 50.9487 49.4761V41.5H48.2637V49.4761C48.2637 50.8568 47.1444 51.9761 45.7637 51.9761ZM48.2637 36.5H50.9487V26H48.2637V36.5Z" fill="white"/>
</svg>

          </a>
          <div className="nav-control">
            <div className="hamburger">
              <span className="line" />
              <span className="line" />
              <span className="line" />
            </div>
          </div>
        </div>
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
                        <b>{data?.name}</b>
                      </h4>
                      {/* <p className="mb-0">{data?.email}</p> */}
                    </div>
                  </div>
                </div>
                <style>{customStyles}</style>
                <ul className="navbar-nav header-right">
                  <li className="nav-item">
                    <div className="card-action coin-tabs mt-3 mt-sm-0">
                      <ul class="nav nav-tabs" role="tablist">
                        <li class="nav-item ">
                          <a
                            class={`nav-link ${selected === "day" && "active"}`}
                            data-bs-toggle="modal"
                            data-bs-target="#DayModal"
                            // href="#day"
                            role="tab"
                          >
                            Day
                          </a>
                        </li>
                        <li class="nav-item">
                          <a
                            class={`nav-link ${
                              selected === "week" && "active"
                            }`}
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
                            class={`nav-link ${
                              selected === "month" && "active"
                            }`} //active
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
                            class={`nav-link ${
                              selected === "year" && "active"
                            }`}
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
            <div className="row">
              <div className="col-xl-6">
                <div className="row">
                  <div className="col-xl-6 col-sm-6">
                    <div className="card">
                      <div className="card-body d-flex align-items-center justify-content-between">
                        <div className="menu">
                          <span className="font-w500 fs-16 d-block mb-2">
                            Total Orders
                          </span>
                          <h2>{data1?.countTotalOrder}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          {/* <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                            5/8
                          </span> */}
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
                            Completed Orders
                          </span>
                          <h2>{data1?.countCompleteOrder}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          {/* <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                            5/6
                          </span> */}
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
                            Cancelled Orders
                          </span>

                          <h2>{data1?.countCanceledOrder}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          {/* <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                            5/8
                          </span> */}
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
                            Total Expenses
                          </span>
                          <h2>{data1?.totalCostSum?.toFixed(2)}</h2>
                        </div>
                        <div className="d-inline-block position-relative donut-chart-sale">
                          {/* <span
                            className="donut1"
                            data-peity='{ "fill": ["rgb(219, 29, 29)", "rgba(247, 245, 255)"],   "innerRadius": 35, "radius": 10}'
                          >
                            5/7
                          </span> */}
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
              {/* <div className="col-xl-6">
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
              </div> */}
              {/* <div className="col-xl-6 col-lg-6">
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
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
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
                          top: "-0.862488px",
                        }}
                      >
                        <desc
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        >
                          Created with Raphaël 2.2.0
                        </desc>
                        <defs
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399993419647217"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399999618530273"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399998188018799"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                        >
                          <tspan
                            dy="4.399999618530273"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fontWeight: "normal",
                          }}
                          fontWeight="normal"
                          transform="matrix(1,0,0,1,0,6.8)"
                        >
                          <tspan
                            dy="4.400002479553223"
                            style={{
                              WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            }}
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
                            fillOpacity: 0,
                          }}
                        ></path>
                        <path
                          fill="none"
                          stroke="#ee3c3c"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,181.5549996614456,100.39184300256831,126.4299997806549,118.84745746391432,122.01999979019165C137.30307192526033,117.6099997997284,174.21430084795236,159.50499970912935,192.66991530929837,166.11999969482423C211.1255297706444,172.7349996805191,248.03675869333645,187.05090936228288,266.49237315468247,174.93999967575073C284.99855094331986,162.79590941473495,322.0109065205945,68.54799580185912,340.5170843092319,69.09999990463257C358.97269877057795,69.65049579947494,395.8839276932699,163.91499969959258,414.33954215461597,179.349999666214C432.795156615962,194.7849996328354,469.706385538654,189.2724996447563,488.16200000000003,192.57999963760375"
                          strokeWidth={3}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        ></path>
                        <circle
                          cx="45.02499961853027"
                          cy="201.39999961853027"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="118.84745746391432"
                          cy="122.01999979019165"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="192.66991530929837"
                          cy="166.11999969482423"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="266.49237315468247"
                          cy="174.93999967575073"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="340.5170843092319"
                          cy="69.09999990463257"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="414.33954215461597"
                          cy="179.349999666214"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="488.16200000000003"
                          cy="192.57999963760375"
                          r={3}
                          fill="#ee3c3c"
                          stroke="#ee3c3c"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <path
                          fill="#0cc4e1"
                          stroke="none"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,188.16999964714051,100.39184300256831,157.2999997138977,118.84745746391432,148.47999973297118C137.30307192526033,139.65999975204465,174.21430084795236,129.4067497742176,192.66991530929837,130.83999977111816C211.1255297706444,132.27324976801873,248.03675869333645,155.5420325494367,266.49237315468247,159.94599970817566C284.99855094331986,164.36203253036322,322.0109065205945,169.76322677312896,340.5170843092319,166.11999969482423C358.97269877057795,162.4867267888646,395.8839276932699,127.53249977827072,414.33954215461597,130.83999977111816C432.795156615962,134.14749976396558,469.706385538654,177.14499967098234,488.16200000000003,192.57999963760375L488.16200000000003,201.39999961853027L45.02499961853027,201.39999961853027Z"
                          fillOpacity={0}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            fillOpacity: 0,
                          }}
                        ></path>
                        <path
                          fill="none"
                          stroke="#00abc5"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,188.16999964714051,100.39184300256831,157.2999997138977,118.84745746391432,148.47999973297118C137.30307192526033,139.65999975204465,174.21430084795236,129.4067497742176,192.66991530929837,130.83999977111816C211.1255297706444,132.27324976801873,248.03675869333645,155.5420325494367,266.49237315468247,159.94599970817566C284.99855094331986,164.36203253036322,322.0109065205945,169.76322677312896,340.5170843092319,166.11999969482423C358.97269877057795,162.4867267888646,395.8839276932699,127.53249977827072,414.33954215461597,130.83999977111816C432.795156615962,134.14749976396558,469.706385538654,177.14499967098234,488.16200000000003,192.57999963760375"
                          strokeWidth={3}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        ></path>
                        <circle
                          cx="45.02499961853027"
                          cy="201.39999961853027"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="118.84745746391432"
                          cy="148.47999973297118"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="192.66991530929837"
                          cy="130.83999977111816"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="266.49237315468247"
                          cy="159.94599970817566"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="340.5170843092319"
                          cy="166.11999969482423"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="414.33954215461597"
                          cy="130.83999977111816"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="488.16200000000003"
                          cy="192.57999963760375"
                          r={3}
                          fill="#00abc5"
                          stroke="#624fd1"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <path
                          fill="#f79c83"
                          stroke="none"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,195.8874996304512,100.39184300256831,183.20874965786933,118.84745746391432,179.349999666214C137.30307192526033,175.49124967455865,174.21430084795236,169.6479996871948,192.66991530929837,170.52999968528746C211.1255297706444,171.41199968338012,248.03675869333645,195.7644298632755,266.49237315468247,186.4059996509552C284.99855094331986,177.02192990380667,322.0109065205945,98.09921872016994,340.5170843092319,95.5599998474121C358.97269877057795,93.0277187311372,395.8839276932699,153.99249972105028,414.33954215461597,166.11999969482423C432.795156615962,178.24749966859818,469.706385538654,185.96499965190887,488.16200000000003,192.57999963760375L488.16200000000003,201.39999961853027L45.02499961853027,201.39999961853027Z"
                          fillOpacity={0}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                            fillOpacity: 0,
                          }}
                        ></path>
                        <path
                          fill="none"
                          stroke="#fd683e"
                          d="M45.02499961853027,201.39999961853027C63.48061407987629,195.8874996304512,100.39184300256831,183.20874965786933,118.84745746391432,179.349999666214C137.30307192526033,175.49124967455865,174.21430084795236,169.6479996871948,192.66991530929837,170.52999968528746C211.1255297706444,171.41199968338012,248.03675869333645,195.7644298632755,266.49237315468247,186.4059996509552C284.99855094331986,177.02192990380667,322.0109065205945,98.09921872016994,340.5170843092319,95.5599998474121C358.97269877057795,93.0277187311372,395.8839276932699,153.99249972105028,414.33954215461597,166.11999969482423C432.795156615962,178.24749966859818,469.706385538654,185.96499965190887,488.16200000000003,192.57999963760375"
                          strokeWidth={3}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        ></path>
                        <circle
                          cx="45.02499961853027"
                          cy="201.39999961853027"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="118.84745746391432"
                          cy="179.349999666214"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="192.66991530929837"
                          cy="170.52999968528746"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="266.49237315468247"
                          cy="186.4059996509552"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="340.5170843092319"
                          cy="95.5599998474121"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="414.33954215461597"
                          cy="166.11999969482423"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
                        />
                        <circle
                          cx="488.16200000000003"
                          cy="192.57999963760375"
                          r={3}
                          fill="#fd683e"
                          stroke="#fd683e"
                          strokeWidth={1}
                          style={{
                            WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                          }}
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
              </div> */}
              {/* <div className="col-xl-6 col-xxl-6">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card">
                      <div className="card-header border-0  flex-wrap">
                        <div>
                          <h4 className="fs-20 mb-1">Customer Map</h4>
                        </div>
                        <div className="d-flex">
                          <div className="card-action coin-tabs mt-3 mt-sm-0">
                            <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-bs-toggle="tab"
                                  href="#Monthly"
                                  role="tab"
                                >
                                  Monthly
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link "
                                  data-bs-toggle="tab"
                                  href="#Daily"
                                  role="tab"
                                >
                                  Daily
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-bs-toggle="tab"
                                  href="#Today"
                                  role="tab"
                                >
                                  Today
                                </a>
                              </li>
                            </ul>
                          </div>
                          <div className="dropdown custom-dropdown mb-0 ms-3">
                            <div
                              className="btn sharp tp-btn dark-btn"
                              data-bs-toggle="dropdown"
                            >
                              <svg
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z"
                                  stroke="#2E2E2E"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12Z"
                                  stroke="#2E2E2E"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12Z"
                                  stroke="#2E2E2E"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a
                                className="dropdown-item"
                                href="javascript:void(0);"
                              >
                                Details
                              </a>
                              <a
                                className="dropdown-item text-danger"
                                href="javascript:void(0);"
                              >
                                Cancel
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body pb-2">
                        <div className="tab-content">
                          <div
                            className="tab-pane fade show active"
                            id="Monthly"
                          >
                            <div
                              id="chartTimeline1"
                              className="chart-timeline"
                            />
                          </div>
                          <div className="tab-pane fade " id="Daily">
                            <div
                              id="chartTimeline2"
                              className="chart-timeline"
                            />
                          </div>
                          <div className="tab-pane fade " id="Today">
                            <div
                              id="chartTimeline3"
                              className="chart-timeline"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
              <a href="https://HelloDish.com/" target="_blank">
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
      {/* Chart Morris plugin files */}
      {/*
       */}
      {/* Chart piety plugin files */}
      {/* Dashboard 1 */}
      {/*  */}
      <DayModal
        onChange={(e) => {
          setDate(e);
        }}
        onSave={() => {
          if (date !== "") {
            setSelected("day");
            GetData2("day");
          }
        }}
      />
      <WeekModal
        onChange={(e) => {
          setWeek(e);
        }}
        onSave={() => {
          if (week.length !== 0) {
            setSelected("week");
            GetData2("week");
          }
        }}
      />
      <MonthModal
        onChange={(e) => {
          const year = e.getFullYear();
          const month = e.getMonth();
          const lastDate = new Date(year, month + 1, 0);
          const formattedLastDate = lastDate;
          let arr = [e, formattedLastDate];
          setMonth(arr);
        }}
        onSave={() => {
          if (month.length !== 0) {
            setSelected("month");
            GetData2("month");
          }
        }}
      />
      <YearModal
        onChange={(e) => {
          const year = e.getFullYear();
          const lastDayOfYear = new Date(year, 11, 31);
          let arr = [e, lastDayOfYear];

          setYear(arr);
        }}
        onSave={() => {
          if (year.length !== 0) {
            setSelected("year");
            GetData2("year");
          }
        }}
      />
    </>
  );
}
export default UserAnalytics;