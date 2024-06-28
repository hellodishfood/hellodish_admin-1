import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slidebar from "../Slidebar";
import { baseurl } from "../../Utilities/Api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Area } from "@ant-design/plots";

import Loader from "../Loader";
import { useAuth } from "../../contexts/auth";

const Dashboard = () => {
  useEffect(() => {
    GetData();
  }, []);

  const { signOut } = useAuth();
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


  const [selected, setSelected] = useState(false);
  const [data, setData] = useState([]);
  const [date, setDate] = useState("");
  const [fsdate, setfsDate] = useState("");
  const [fedate, setfeDate] = useState("");
  const [cdate, setcDate] = useState("");
  const [load, setLoad] = useState(false);
  const [pname, setpname] = useState("");
  const [pimage, setpimage] = useState("");
  const [week, setWeek] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const navigate = useNavigate();

  function FormatDate(date) {
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");

    return formattedDate;
  }

  function GetData() {
    setLoad(true);
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
        setLoad(false);
        console.log("dep", result);
        if (result.status === true) {
          let [a, b] = new Date().toString().split("G");
          setcDate(formatDate(new Date()));
          setData(result.data);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  function formatDate(date) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    let suffix = "th";

    // Determine the suffix for the day of month (e.g., st, nd, rd, th)
    if (dayOfMonth === 1 || dayOfMonth === 21 || dayOfMonth === 31) {
      suffix = "st";
    } else if (dayOfMonth === 2 || dayOfMonth === 22) {
      suffix = "nd";
    } else if (dayOfMonth === 3 || dayOfMonth === 23) {
      suffix = "rd";
    }

    return `${day}, ${month} ${dayOfMonth}${suffix} ${date.getFullYear()}`;
  }
  function GetData2(type) {
    setLoad(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    let raw;

    if (type === "date") {
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
    } else if (type === "filter") {
      raw = JSON.stringify({
        startDate: fsdate,
        endDate: fedate,
      });
    }
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/dashboard`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          console.log(result.data);
          setData(result.data);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  const revenueeconfig = {
    data: {
      type: "fetch",
      value: "https://assets.antv.antgroup.com/g2/stocks.json",
      transform: [{ type: "filter", callback: (d) => d.symbol === "GOOG" }],
    },
    xField: (d) => new Date(d.date),
    yField: "price",
    style: {
      fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },
    axis: {
      // y: { label: null, labelFormatter: "~s" },
      // x: { label: null },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };

  const revenueconfig = {
    data: data?.getAdminCommissionGraph,
    xField: (d) => new Date(d.createdAt),
    yField: "revenue",

    style: {
      fill: "linear-gradient(-90deg, white 0%, darkgreen 100%)",
    },

    axis: {
      // y: { label: null },
      // x: { label: null },
    },
    line: {
      style: {
        stroke: "darkgreen",
        strokeWidth: 2,
      },
    },
  };
  const cancelconfig = {
    data: data?.getCanceledOrderGraph,
    xField: (d) => new Date(d.date),
    yField: "count",

    style: {
      fill: "linear-gradient(-90deg, white 0%, #F8AE55 100%)",
    },

    axis: {
      // y: { label: null },
      // x: { label: null },
    },
    line: {
      style: {
        stroke: "#F8AE55",
        strokeWidth: 2,
      },
    },
  };
  const completeconfig = {
    data: data?.getCompleteOrderGraph,
    xField: (d) => new Date(d.date),
    yField: "count",

    style: {
      fill: "linear-gradient(-90deg, white 0%, #7854DF 100%)",
    },

    axis: {
      // y: { label: null },
      // x: { label: null },
    },
    line: {
      style: {
        stroke: "#7854DF",
        strokeWidth: 2,
      },
    },
  };
  const dactiveconfig = {
    data: data?.getDriverGraph,
    xField: (d) => new Date(d.date),
    yField: "count",

    style: {
      fill: "linear-gradient(-90deg, white 0%, #E7BCDE 100%)",
    },

    axis: {
      // y: { label: null },
      // x: { label: null },
    },
    line: {
      style: {
        stroke: "#E7BCDE",
        strokeWidth: 2,
      },
    },
  };
  const uactiveconfig = {
    data: data?.getCustomerGraph,
    xField: (d) => new Date(d.date),
    yField: "count",

    style: {
      fill: "linear-gradient(-90deg, white 0%, #DF826C 100%)",
    },

    axis: {
      // y: { label: null },
      // x: { label: null },
    },
    line: {
      style: {
        stroke: "#DF826C",
        strokeWidth: 2,
      },
    },
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    GetProfile();
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 2000);
  }, []);

  function GetProfile() {
    setLoad(true);
    let token = localStorage.getItem("authToken");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseurl}restaurant/api/profile`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        setpname(result?.user?.user?.ownerName);
        setpimage(result?.user?.user?.profileImage);
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  return (
    <>
      {isLoading ? (
        <div id="preloader" className="d-block">
          <div class="gooey">
            <span class="dot"></span>
            <div class="dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="main-wrapper">
            <div class="nav-header">
              <Link to="/Home" className="brand-logo">
                <svg
                  width="100"
                  height="128"
                  viewBox="0 0 100 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.588 107.691H21.487L21.253 109.581C21.253 109.581 21.253 109.584 21.253 109.59C21.253 109.596 21.253 109.602 21.253 109.608L21.226 109.851L21.1 110.868L21.064 111.111L21.028 111.462L20.992 111.705L20.974 111.903L20.947 112.092V112.119V112.128L20.938 112.182L20.866 112.758L20.848 112.875L20.713 114.018H18.805L18.814 113.982L18.913 113.154L19.039 112.128L19.12 111.498V111.48H15.916L15.862 111.93L15.601 114.018H13.702L13.945 112.002L14.323 108.978L13.441 107.718H16.375L16.321 108.213L16.15 109.608L16.114 109.851L16.105 109.959L15.988 110.004L15.439 110.22H19.273V110.202L19.282 110.184V110.175V110.166L19.318 109.851V109.842L19.345 109.608L19.426 108.951L19.453 108.753L19.48 108.51L19.579 107.718L19.588 107.691ZM21.9444 107.7H28.7304C28.9044 107.7 29.0574 107.724 29.1894 107.772C29.3214 107.82 29.4264 107.883 29.5044 107.961C29.5824 108.033 29.6454 108.114 29.6934 108.204C29.7474 108.288 29.7834 108.375 29.8014 108.465C29.8194 108.555 29.8314 108.639 29.8374 108.717C29.8434 108.789 29.8434 108.849 29.8374 108.897L29.8284 108.96L29.7654 109.482C29.7594 109.512 29.7564 109.548 29.7564 109.59H24.0234L24.6174 109.833L24.5724 110.22H27.1374L26.9844 111.48H24.4194L24.3924 111.723L24.3834 111.759L24.3654 111.876V111.912L24.3384 112.11H29.4504L29.3694 112.74C29.3634 112.776 29.3544 112.824 29.3424 112.884C29.3304 112.938 29.2914 113.037 29.2254 113.181C29.1654 113.325 29.0874 113.454 28.9914 113.568C28.9014 113.676 28.7634 113.775 28.5774 113.865C28.3974 113.955 28.1904 114 27.9564 114H22.2054L22.3044 113.172L22.8264 108.96L21.9444 107.7ZM30.2282 107.7H33.1622L33.1082 108.195L32.9372 109.59L32.9012 109.833L32.8562 110.211L32.7032 111.462L32.6492 111.912L32.6222 112.11H36.9152L36.8342 112.74L36.6812 114H30.4892L30.7322 111.993L31.1102 108.96L30.2282 107.7ZM37.5014 107.7H40.4354L40.3814 108.195L40.2104 109.59L40.1744 109.833L40.1294 110.211L39.9764 111.462L39.9224 111.912L39.8954 112.11H44.1884L44.1074 112.74L43.9544 114H37.7624L38.0054 111.993L38.3834 108.96L37.5014 107.7ZM46.3765 107.7H46.6285H51.0205C51.1945 107.7 51.3475 107.724 51.4795 107.772C51.6175 107.82 51.7225 107.883 51.7945 107.961C51.8725 108.033 51.9355 108.114 51.9835 108.204C52.0375 108.288 52.0735 108.375 52.0915 108.465C52.1095 108.555 52.1215 108.639 52.1275 108.717C52.1335 108.789 52.1335 108.849 52.1275 108.897V108.96L52.0645 109.482C52.0585 109.512 52.0525 109.548 52.0465 109.59L52.0195 109.833L51.8935 110.85L51.8665 111.093L51.7405 112.11L51.6595 112.74C51.6535 112.776 51.6445 112.824 51.6325 112.884C51.6205 112.938 51.5815 113.037 51.5155 113.181C51.4555 113.325 51.3805 113.454 51.2905 113.568C51.2005 113.676 51.0625 113.775 50.8765 113.865C50.6905 113.955 50.4805 114 50.2465 114H45.7555C45.5875 114 45.4375 113.979 45.3055 113.937C45.1735 113.889 45.0685 113.832 44.9905 113.766C44.9185 113.694 44.8555 113.613 44.8015 113.523C44.7475 113.427 44.7115 113.34 44.6935 113.262C44.6755 113.184 44.6605 113.103 44.6485 113.019C44.6425 112.929 44.6395 112.869 44.6395 112.839C44.6455 112.803 44.6485 112.773 44.6485 112.749L44.8465 111.183L44.9275 110.517L44.9815 110.067L45.1165 108.96L45.1345 108.816L45.1435 108.708C45.1615 108.618 45.1855 108.534 45.2155 108.456C45.2455 108.378 45.2905 108.291 45.3505 108.195C45.4165 108.099 45.4915 108.018 45.5755 107.952C45.6595 107.88 45.7705 107.82 45.9085 107.772C46.0465 107.724 46.2025 107.7 46.3765 107.7ZM46.3135 109.59L46.9075 109.833L46.8625 110.22L46.7545 111.156L46.7185 111.381L46.7095 111.48L46.6825 111.723L46.6555 111.921L46.6285 112.11H50.4625L49.8685 111.867L49.9135 111.48L50.0665 110.22L50.1475 109.59H46.3135ZM52.6894 107.736H53.5714H59.4754C59.6494 107.736 59.8024 107.76 59.9344 107.808C60.0664 107.85 60.1714 107.91 60.2494 107.988C60.3274 108.06 60.3904 108.141 60.4384 108.231C60.4924 108.321 60.5284 108.411 60.5464 108.501C60.5644 108.591 60.5764 108.672 60.5824 108.744C60.5884 108.816 60.5884 108.876 60.5824 108.924L60.5734 108.996L60.5104 109.509C60.5044 109.545 60.5014 109.584 60.5014 109.626L60.4744 109.869L60.3484 110.886L60.3124 111.129L60.1954 112.137L60.1144 112.767C60.1084 112.803 60.0994 112.851 60.0874 112.911C60.0754 112.965 60.0364 113.064 59.9704 113.208C59.9104 113.352 59.8324 113.481 59.7364 113.595C59.6464 113.703 59.5084 113.802 59.3224 113.892C59.1424 113.982 58.9354 114.027 58.7014 114.027H52.9504L53.5714 108.996L52.6894 107.736ZM54.7684 109.626L55.3624 109.86L55.3174 110.256L55.2004 111.183L55.1734 111.417L55.1644 111.516L55.1374 111.75L55.1104 111.948L55.0834 112.137H58.2874L58.3684 111.516L58.5214 110.256L58.5934 109.626H54.7684ZM61.1313 107.7H64.0653L64.0113 108.195L63.8403 109.59L63.8043 109.833L63.7593 110.211L63.6063 111.462L63.5523 111.912L63.4713 112.578L63.2913 114H61.3923L61.6353 111.993L62.0133 108.96L61.1313 107.7ZM66.9044 107.691H67.4444H71.2964C71.4644 107.691 71.6144 107.715 71.7464 107.763C71.8784 107.805 71.9834 107.862 72.0614 107.934C72.1394 108 72.2024 108.081 72.2504 108.177C72.3044 108.267 72.3404 108.351 72.3584 108.429C72.3824 108.507 72.3974 108.591 72.4034 108.681C72.4094 108.771 72.4094 108.831 72.4034 108.861C72.4034 108.891 72.4034 108.918 72.4034 108.942L72.3674 109.194L72.3314 109.464C72.3254 109.5 72.3224 109.536 72.3224 109.572V109.581L72.2954 109.824H72.2864H70.3874L70.4144 109.581H66.5894L67.1834 109.815L67.1384 110.202H70.9814C71.1554 110.202 71.3084 110.226 71.4404 110.274C71.5724 110.322 71.6774 110.385 71.7554 110.463C71.8334 110.535 71.8964 110.616 71.9444 110.706C71.9984 110.79 72.0344 110.877 72.0524 110.967C72.0704 111.057 72.0824 111.141 72.0884 111.219C72.0944 111.291 72.0974 111.351 72.0974 111.399L72.0884 111.462L72.0164 112.092L71.9714 112.407L71.9354 112.722C71.9294 112.758 71.9204 112.806 71.9084 112.866C71.8964 112.92 71.8574 113.019 71.7914 113.163C71.7314 113.307 71.6534 113.436 71.5574 113.55C71.4674 113.658 71.3294 113.757 71.1434 113.847C70.9634 113.937 70.7564 113.982 70.5224 113.982H66.0314C65.8634 113.982 65.7134 113.961 65.5814 113.919C65.4494 113.871 65.3444 113.814 65.2664 113.748C65.1884 113.682 65.1224 113.601 65.0684 113.505C65.0204 113.409 64.9844 113.322 64.9604 113.244C64.9424 113.166 64.9304 113.085 64.9244 113.001C64.9184 112.911 64.9154 112.851 64.9154 112.821C64.9214 112.791 64.9244 112.764 64.9244 112.74L65.0144 111.984L65.0324 111.84H66.9404L66.9314 111.903L66.9044 112.092H70.7384L70.1354 111.858L70.1894 111.462H66.3374C66.1694 111.462 66.0164 111.441 65.8784 111.399C65.7464 111.351 65.6414 111.291 65.5634 111.219C65.4914 111.141 65.4284 111.057 65.3744 110.967C65.3264 110.877 65.2934 110.79 65.2754 110.706C65.2574 110.616 65.2424 110.535 65.2304 110.463C65.2244 110.385 65.2244 110.322 65.2304 110.274L65.2394 110.211L65.2574 110.058L65.3564 109.203L65.3924 108.951L64.5104 107.691H66.6434H66.9044ZM79.0738 107.691H80.9728L80.7388 109.581C80.7388 109.581 80.7388 109.584 80.7388 109.59C80.7388 109.596 80.7388 109.602 80.7388 109.608L80.7118 109.851L80.5858 110.868L80.5498 111.111L80.5138 111.462L80.4778 111.705L80.4598 111.903L80.4328 112.092V112.119V112.128L80.4238 112.182L80.3518 112.758L80.3338 112.875L80.1988 114.018H78.2908L78.2998 113.982L78.3988 113.154L78.5248 112.128L78.6058 111.498V111.48H75.4018L75.3478 111.93L75.0868 114.018H73.1878L73.4308 112.002L73.8088 108.978L72.9268 107.718H75.8608L75.8068 108.213L75.6358 109.608L75.5998 109.851L75.5908 109.959L75.4738 110.004L74.9248 110.22H78.7588V110.202L78.7678 110.184V110.175V110.166L78.8038 109.851V109.842L78.8308 109.608L78.9118 108.951L78.9388 108.753L78.9658 108.51L79.0648 107.718L79.0738 107.691Z"
                    fill="#DB1D1D"
                  />
                  <circle cx="50" cy="50" r="41" fill="#DB1D1D" />
                  <path
                    d="M50 73V88"
                    stroke="white"
                    stroke-width="6.6"
                    stroke-linecap="square"
                  />
                  <path
                    d="M98.1697 62.4397C98.3034 62.4742 98.4398 62.3938 98.4736 62.2599C100.387 54.6933 100.503 46.7826 98.811 39.1611C97.1005 31.4582 93.5913 24.2695 88.5702 18.1827C83.5491 12.0959 77.1587 7.28391 69.9215 4.14008C62.6844 0.996255 54.8059 -0.390115 46.9303 0.0943222C39.0546 0.57876 31.4054 2.92025 24.6081 6.92735C17.8108 10.9345 12.0584 16.4934 7.82111 23.1497C3.58384 29.8059 0.982078 37.3705 0.22853 45.225C-0.517055 52.9964 0.567675 60.8333 3.39433 68.1083C3.44434 68.237 3.58961 68.3001 3.71806 68.2495C3.8465 68.1989 3.90948 68.0536 3.85948 67.9249C1.06177 60.7233 -0.0118052 52.9657 0.726245 45.2727C1.47226 37.4968 4.04801 30.0079 8.2429 23.4182C12.4378 16.8285 18.1327 11.3251 24.8621 7.35808C31.5914 3.39105 39.1641 1.07297 46.961 0.593379C54.7578 0.113786 62.5575 1.48629 69.7223 4.59868C76.8871 7.71107 83.2136 12.475 88.1845 18.5009C93.1554 24.5268 96.6295 31.6436 98.3229 39.2695C99.9982 46.8139 99.8835 54.6447 97.9895 62.1349C97.9557 62.2688 98.036 62.4052 98.1697 62.4397Z"
                    fill="#DB1D1D"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M45.7637 51.9761C44.383 51.9761 43.2637 50.8568 43.2637 49.4761L43.2637 26H43C41.3431 26 40 27.3431 40 29V62.1099C40 67.4153 44.3009 71.7162 49.6063 71.7162C54.9117 71.7162 59.2126 67.4153 59.2126 62.1099V29C59.2126 27.3431 57.8695 26 56.2126 26H55.9487V49.4761C55.9487 50.8568 54.8294 51.9761 53.4487 51.9761C52.068 51.9761 50.9487 50.8568 50.9487 49.4761V41.5H48.2637V49.4761C48.2637 50.8568 47.1444 51.9761 45.7637 51.9761ZM48.2637 36.5H50.9487V26H48.2637V36.5Z"
                    fill="white"
                  />
                </svg>
              </Link>
              <div class="nav-control">
                <div class="hamburger">
                  <span class="line"></span>
                  <span class="line"></span>
                  <span class="line"></span>
                </div>
              </div>
            </div>

            <div class="header">
              <div class="header-content">
                <nav class="navbar navbar-expand">
                  <div class="collapse navbar-collapse justify-content-between">
                    <div class="header-left">
                      <div class="banner_heading">
                        <h2>DASHBOARD</h2>
                        <small>{cdate}</small>
                      </div>
                    </div>
                    <ul class="navbar-nav header-right">
                      <li class="nav-item">
                        <div class="card-action coin-tabs mt-3 mt-sm-0">
                          <ul class="nav nav-tabs" role="tablist">
                            <li class="nav-item ">
                              <a
                                class={`nav-link ${
                                  selected === "date" && "active"
                                }`}
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

                      <li className="nav-item">
                        <div
                          className="calender-head"
                          data-bs-toggle="modal"
                          data-bs-target="#filterModal"
                        >
                          <div className="calender-head-icon">
                            <img src="images/calender-icon.png" alt="" />
                          </div>
                          <div className="calender-head-content">
                            <h6>Filter Period</h6>
                            {fsdate !== "" && fedate !== "" && (
                              <p>
                                {FormatDate(fsdate)} - {FormatDate(fedate)}
                              </p>
                            )}
                          </div>
                          <img src="images/arrow-right.svg" alt="" />
                        </div>
                      </li>

                      {/* <li></li> */}

                      <li class="nav-item dropdown  header-profile">
                        <p className="mb-0 me-3">
                          Hello, <b>{pname}</b>
                        </p>
                        <a
                          class="nav-link"
                          href="javascript:void(0);"
                          role="button"
                          data-bs-toggle="dropdown"
                        >
                          {pimage !== "" ? (
                            <img src={pimage} width="56" alt="" />
                          ) : (
                            <img src="images/user.png" width="56" alt="" />
                          )}
                        </a>
                        <div class="dropdown-menu dropdown-menu-end">
                          <Link class="dropdown-item ai-icon" to={"/Profile"}>
                            <svg
                              id="icon-user1"
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-primary"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                              <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            <span class="ms-2">Profile</span>
                          </Link>
                          <Link class="dropdown-item ai-icon" to={"/Chat"}>
                            <svg
                              id="icon-inbox"
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-success"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                              <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <span class="ms-2">Inbox </span>
                          </Link>

                          <a
                            class="dropdown-item ai-icon"
                            onClick={() => {
                              signOut();
                            }}
                          >
                            <svg
                              id="icon-logout"
                              xmlns="http://www.w3.org/2000/svg"
                              class="text-danger"
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            <span class="ms-2">Logout </span>
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>

            <Slidebar />
            <div class="content-body">
              <section class="bg-light-gray">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-2 col-md-4 col-sm-6">
                      <div class="card-d success1 ">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12 6V18"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          {/* <div class="pils">+ 2.0%</div> */}
                        </div>
                        <div>
                          <p class="mb-0">Total Sale</p>
                          <h5>₹ {data?.totalSales?.toFixed(2)}</h5>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6" style={{marginLeft:"-15px"}}>
                      <div class="card-d full-dark-blue ">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <img src="images/Served-Orders.png" />
                          </div>
                          {/* <div class="pils">+ 2.0%</div> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <p class="mb-0">Served Orders</p>
                            <h5>{data?.getCompleteOrder?.length}</h5>
                          </div>
                          <div class="d-duration">
                            {/* This <br />
                            Month */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6"  style={{marginLeft:"-15px"}}>
                      <div class="card-d full-purpel">
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M22.2002 6V8.42C22.2002 10 21.2002 11 19.6202 11H16.2002V4.01C16.2002 2.9 17.1102 2 18.2202 2C19.3102 2.01 20.3102 2.45 21.0302 3.17C21.7502 3.9 22.2002 4.9 22.2002 6Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M2.2002 7V21C2.2002 21.83 3.14019 22.3 3.80019 21.8L5.51019 20.52C5.91019 20.22 6.47019 20.26 6.83019 20.62L8.4902 22.29C8.8802 22.68 9.52019 22.68 9.91019 22.29L11.5902 20.61C11.9402 20.26 12.5002 20.22 12.8902 20.52L14.6002 21.8C15.2602 22.29 16.2002 21.82 16.2002 21V4C16.2002 2.9 17.1002 2 18.2002 2H7.2002H6.2002C3.2002 2 2.2002 3.79 2.2002 6V7Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.4502 10H11.9502"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          {/* <div class="pils">+ 2.0%</div> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <p class="mb-0">Total Order</p>
                            <h5>{data?.countOrder}</h5>
                          </div>
                          <div class="d-duration">
                            {/* This <br />
                            Month */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6"  style={{marginLeft:"-15px"}}>
                      <div
                        class="card-d primery-blue"
                        onClick={async () => {
                          await localStorage.setItem("stab", "Driver");
                          navigate("/Driver");
                        }}
                      >
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.7999 7.16C18.7399 7.15 18.6699 7.15 18.6099 7.16C17.2299 7.11 16.1299 5.98 16.1299 4.58C16.1299 3.15 17.2799 2 18.7099 2C20.1399 2 21.2899 3.16 21.2899 4.58C21.2799 5.98 20.1799 7.11 18.7999 7.16Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M17.7702 14.4402C19.1402 14.6702 20.6502 14.4302 21.7102 13.7202C23.1202 12.7802 23.1202 11.2402 21.7102 10.3002C20.6402 9.59016 19.1102 9.35016 17.7402 9.59016"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.77028 7.16C6.83028 7.15 6.90027 7.15 6.96027 7.16C8.34027 7.11 9.44027 5.98 9.44027 4.58C9.44027 3.15 8.29028 2 6.86028 2C5.43028 2 4.28027 3.16 4.28027 4.58C4.29027 5.98 5.39028 7.11 6.77028 7.16Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7.80023 14.4402C6.43023 14.6702 4.92023 14.4302 3.86023 13.7202C2.45023 12.7802 2.45023 11.2402 3.86023 10.3002C4.93023 9.59016 6.46023 9.35016 7.83023 9.59016"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.7999 14.6297C12.7399 14.6197 12.6699 14.6197 12.6099 14.6297C11.2299 14.5797 10.1299 13.4497 10.1299 12.0497C10.1299 10.6197 11.2799 9.46973 12.7099 9.46973C14.1399 9.46973 15.2899 10.6297 15.2899 12.0497C15.2799 13.4497 14.1799 14.5897 12.7999 14.6297Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M9.88953 17.7794C8.47953 18.7194 8.47953 20.2594 9.88953 21.1994C11.4895 22.2694 14.1095 22.2694 15.7095 21.1994C17.1195 20.2594 17.1195 18.7194 15.7095 17.7794C14.1195 16.7194 11.4895 16.7194 9.88953 17.7794Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          {/* <div class="pils">+ 2.0%</div> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <p class="mb-0">Total Drivers</p>
                            <h5>{data?.countDriver}</h5>
                          </div>
                          <div class="d-duration">
                            {/* This <br />
                            Month */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6"  style={{marginLeft:"-15px"}}>
                      <div
                        class="card-d full-carret"
                        onClick={async () => {
                          await localStorage.setItem("stab", "Restaurant");
                          navigate("/Restaurant");
                        }}
                      >
                        <div class="d-flex align-items-center justify-content-between mb-2" >
                          <div class="d-svg">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.41016 11.2197V15.7097C3.41016 20.1997 5.21016 21.9997 9.70016 21.9997H15.0902C19.5802 21.9997 21.3802 20.1997 21.3802 15.7097V11.2197"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.4009 12C14.2309 12 15.5809 10.51 15.4009 8.68L14.7409 2H10.0709L9.40087 8.68C9.22087 10.51 10.5709 12 12.4009 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M18.7102 12C20.7302 12 22.2102 10.36 22.0102 8.35L21.7302 5.6C21.3702 3 20.3702 2 17.7502 2H14.7002L15.4002 9.01C15.5702 10.66 17.0602 12 18.7102 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.04076 12C7.69076 12 9.18076 10.66 9.34076 9.01L9.56076 6.8L10.0408 2H6.99076C4.37076 2 3.37076 3 3.01076 5.6L2.74076 8.35C2.54076 10.36 4.02076 12 6.04076 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.4004 17C10.7304 17 9.90039 17.83 9.90039 19.5V22H14.9004V19.5C14.9004 17.83 14.0704 17 12.4004 17Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          {/* <div class="pils">+ 2.0%</div> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <p class="mb-0">Total Restaurant</p>
                            <h5>{data?.countRestaurant}</h5>
                          </div>
                          <div class="d-duration">
                            {/* This <br />
                            Month */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-2 col-md-4 col-sm-6"  style={{marginLeft:"-15px"}}>
                      <div
                        class="card-d perp-blue "
                        onClick={async () => {
                          await localStorage.setItem("stab", "Users");
                          navigate("/Users");
                        }}
                      >
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          {/* <div class="pils">+ 2.0%</div> */}
                        </div>
                        <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <p class="mb-0">Total Users</p>
                            <h5>{data?.countUsers}</h5>
                          </div>
                          <div class="d-duration">
                            {/* This <br />
                            Month */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-lg-2 col-md-12 card-in-md">
                      <div
                        class="card-d d-red for-md-50 "
                        onClick={async () => {
                          await localStorage.setItem("stab", "Driver");
                          navigate("/Driver");
                        }}
                      >
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.7999 7.16C18.7399 7.15 18.6699 7.15 18.6099 7.16C17.2299 7.11 16.1299 5.98 16.1299 4.58C16.1299 3.15 17.2799 2 18.7099 2C20.1399 2 21.2899 3.16 21.2899 4.58C21.2799 5.98 20.1799 7.11 18.7999 7.16Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M17.7702 14.4402C19.1402 14.6702 20.6502 14.4302 21.7102 13.7202C23.1202 12.7802 23.1202 11.2402 21.7102 10.3002C20.6402 9.59016 19.1102 9.35016 17.7402 9.59016"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.77028 7.16C6.83028 7.15 6.90027 7.15 6.96027 7.16C8.34027 7.11 9.44027 5.98 9.44027 4.58C9.44027 3.15 8.29028 2 6.86028 2C5.43028 2 4.28027 3.16 4.28027 4.58C4.29027 5.98 5.39028 7.11 6.77028 7.16Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M7.80023 14.4402C6.43023 14.6702 4.92023 14.4302 3.86023 13.7202C2.45023 12.7802 2.45023 11.2402 3.86023 10.3002C4.93023 9.59016 6.46023 9.35016 7.83023 9.59016"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.7999 14.6297C12.7399 14.6197 12.6699 14.6197 12.6099 14.6297C11.2299 14.5797 10.1299 13.4497 10.1299 12.0497C10.1299 10.6197 11.2799 9.46973 12.7099 9.46973C14.1399 9.46973 15.2899 10.6297 15.2899 12.0497C15.2799 13.4497 14.1799 14.5897 12.7999 14.6297Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M9.88953 17.7794C8.47953 18.7194 8.47953 20.2594 9.88953 21.1994C11.4895 22.2694 14.1095 22.2694 15.7095 21.1994C17.1195 20.2594 17.1195 18.7194 15.7095 17.7794C14.1195 16.7194 11.4895 16.7194 9.88953 17.7794Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div class="d-svi">
                            <svg
                              width="40"
                              height="24"
                              viewBox="0 0 40 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M22.6836 17.9405L27.5736 13.0505C28.1511 12.473 28.1511 11.528 27.5736 10.9505L22.6836 6.06055"
                                stroke="#FF9494"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M32.457 15.961L35.717 12.701C36.102 12.316 36.102 11.686 35.717 11.301L32.457 8.04102"
                                stroke="#FF4F4F"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <p class="mb-0 mt-3">UnApproved Drivers</p>
                        <div class="d-point-veget">
                          <small>{data?.countDriverPendigApproval}</small>
                        </div>
                      </div>
                      <div
                        class="card-d d-red mt-4 for-md-50 "
                        onClick={async () => {
                          await localStorage.setItem("stab", "Restaurant");
                          navigate("/Restaurant");
                        }}
                      >
                        <div class="d-flex align-items-center justify-content-between mb-2">
                          <div class="d-svg">
                            <svg
                              width="25"
                              height="24"
                              viewBox="0 0 25 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M3.41016 11.2197V15.7097C3.41016 20.1997 5.21016 21.9997 9.70016 21.9997H15.0902C19.5802 21.9997 21.3802 20.1997 21.3802 15.7097V11.2197"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.4009 12C14.2309 12 15.5809 10.51 15.4009 8.68L14.7409 2H10.0709L9.40087 8.68C9.22087 10.51 10.5709 12 12.4009 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M18.7102 12C20.7302 12 22.2102 10.36 22.0102 8.35L21.7302 5.6C21.3702 3 20.3702 2 17.7502 2H14.7002L15.4002 9.01C15.5702 10.66 17.0602 12 18.7102 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M6.04076 12C7.69076 12 9.18076 10.66 9.34076 9.01L9.56076 6.8L10.0408 2H6.99076C4.37076 2 3.37076 3 3.01076 5.6L2.74076 8.35C2.54076 10.36 4.02076 12 6.04076 12Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M12.4004 17C10.7304 17 9.90039 17.83 9.90039 19.5V22H14.9004V19.5C14.9004 17.83 14.0704 17 12.4004 17Z"
                                stroke="#292D32"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                          <div class="d-svi">
                            <svg
                              width="40"
                              height="24"
                              viewBox="0 0 40 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"
                                stroke="white"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M22.6836 17.9405L27.5736 13.0505C28.1511 12.473 28.1511 11.528 27.5736 10.9505L22.6836 6.06055"
                                stroke="#FF9494"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M32.457 15.961L35.717 12.701C36.102 12.316 36.102 11.686 35.717 11.301L32.457 8.04102"
                                stroke="#FF4F4F"
                                stroke-width="1.5"
                                stroke-miterlimit="10"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <p class="mb-0 mt-3">Unapproved Restaurant</p>
                        <div class="d-point-veget">
                          <small>{data?.countRestaurantPendigApproval}</small>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-10 col-md-12"  style={{marginLeft:"-15px"}}>
                      <div class="row">
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12">
                          <div class="d2-card">
                            <div class="d-flex align-items-center gap-2">
                              <div class="d2-svg">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.67188 14.3298C8.67188 15.6198 9.66188 16.6598 10.8919 16.6598H13.4019C14.4719 16.6598 15.3419 15.7498 15.3419 14.6298C15.3419 13.4098 14.8119 12.9798 14.0219 12.6998L9.99187 11.2998C9.20187 11.0198 8.67188 10.5898 8.67188 9.36984C8.67188 8.24984 9.54187 7.33984 10.6119 7.33984H13.1219C14.3519 7.33984 15.3419 8.37984 15.3419 9.66984"
                                    stroke="#292D32"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M12 6V18"
                                    stroke="#292D32"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
                                    stroke="#292D32"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </div>
                              <div>
                                <h5>Revenue</h5>
                                {/* <p class="mb-0">( 30 days )</p> */}
                              </div>
                            </div>
                            <div class="graph-svg">
                              {data &&
                              data.getAdminCommissionGraph &&
                              data.getAdminCommissionGraph.length !== 0 ? (
                                <Area {...revenueconfig} height={160} />
                              ) : (
                                <h5>No Data Found !</h5>
                              )}
                            </div>
                            {/* <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <h4>$1.02</h4>
                          </div>
                          <div class="d-flex align-items-center gap-2">
                            <h5>- 4.75%</h5>

                            <svg
                              width="25"
                              height="26"
                              viewBox="0 0 25 26"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12.609 22.9999C18.1287 22.9396 22.5594 18.4109 22.4991 12.8912C22.4388 7.37155 17.9101 2.94077 12.3905 3.00109C6.87079 3.0614 2.44001 7.59009 2.50032 13.1098C2.56064 18.6294 7.08932 23.0602 12.609 22.9999ZM7.24643 12.7279C7.24195 12.3179 7.57822 11.9742 7.98819 11.9697C8.39817 11.9652 8.74187 12.3015 8.74635 12.7115L8.77934 15.7313L16.4145 7.92741C16.5629 7.77578 16.7521 7.70371 16.9421 7.70163C17.1321 7.69956 17.3228 7.76748 17.4745 7.91583C17.7676 8.20264 17.7729 8.68261 17.486 8.97577L9.85086 16.7797L12.8707 16.7467C13.2807 16.7422 13.6244 17.0784 13.6288 17.4884C13.6333 17.8984 13.297 18.2421 12.8871 18.2466L8.05736 18.2993C7.64739 18.3038 7.30369 17.9676 7.29921 17.5576L7.24643 12.7279Z"
                                fill="#618264"
                              />
                            </svg>
                          </div>
                        </div> */}
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12"  style={{marginLeft:"-15px"}}>
                          <div class="d2-card">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5>Order Cancelled</h5>
                                {/* <p class="mb-0">( 30 days )</p> */}
                              </div>
                            </div>

                            <div class="graph-svg">
                              {data &&
                              data.getCanceledOrderGraph &&
                              data.getCanceledOrderGraph.length !== 0 ? (
                                <Area {...cancelconfig} height={160} />
                              ) : (
                                <h5>No Data Found !</h5>
                              )}
                            </div>

                            {/* <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <h4>35</h4>
                          </div>
                          <div class="d-flex align-items-center gap-2">
                            <h5>6.75%</h5>

                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z"
                                fill="#F8AE55"
                              />
                            </svg>
                          </div>
                        </div> */}
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12" style={{marginLeft:"-15px"}}>
                          <div class="d2-card">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5>Order Completed</h5>
                                {/* <p class="mb-0">( 30 days )</p> */}
                              </div>
                            </div>
                            <div class="graph-svg">
                              {data &&
                              data.getCompleteOrderGraph &&
                              data.getCompleteOrderGraph.length !== 0 ? (
                                <Area {...completeconfig} height={160} />
                              ) : (
                                <h5>No Data Found !</h5>
                              )}
                            </div>
                            {/* <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <h4>$1,633.05</h4>
                          </div>
                          <div class="d-flex align-items-center gap-2">
                            <h5>+ 3.75%</h5>

                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z"
                                fill="#7854DF"
                              />
                            </svg>
                          </div>
                        </div> */}
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6 offset-lg-4 col-sm-6 col-12">
                          <div class="d2-card">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5>Active Driver</h5>
                                {/* <p class="mb-0">( 30 days )</p> */}
                              </div>
                            </div>
                            <div class="graph-svg">
                              {data &&
                              data.getDriverGraph &&
                              data.getDriverGraph.length !== 0 ? (
                                <Area {...dactiveconfig} height={160} />
                              ) : (
                                <h5>No Data Found !</h5>
                              )}
                            </div>
                            {/* <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <h4>35</h4>
                          </div>
                          <div class="d-flex align-items-center gap-2">
                            <h5>6.75%</h5>

                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z"
                                fill="#E7BCDE"
                              />
                            </svg>
                          </div>
                        </div> */}
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-6 col-sm-6 col-12"style={{marginLeft:"-15px"}}>
                          <div class="d2-card">
                            <div class="d-flex align-items-center gap-2">
                              <div>
                                <h5>Active User</h5>
                                {/* <p class="mb-0">( 30 days )</p> */}
                              </div>
                            </div>
                            <div class="graph-svg">
                              {data &&
                              data.getCustomerGraph &&
                              data.getCustomerGraph.length !== 0 ? (
                                <Area {...uactiveconfig} height={160} />
                              ) : (
                                <h5>No Data Found !</h5>
                              )}
                            </div>
                            {/* <div class="d-flex align-items-center justify-content-between">
                          <div>
                            <h4>35</h4>
                          </div>
                          <div class="d-flex align-items-center gap-2">
                            <h5>6.75%</h5>

                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17.25 12.33C17.25 12.74 16.91 13.08 16.5 13.08C16.09 13.08 15.75 12.74 15.75 12.33V9.31L8.03 17.03C7.88 17.18 7.69 17.25 7.5 17.25C7.31 17.25 7.12 17.18 6.97 17.03C6.68 16.74 6.68 16.26 6.97 15.97L14.69 8.25H11.67C11.26 8.25 10.92 7.91 10.92 7.5C10.92 7.09 11.26 6.75 11.67 6.75H16.5C16.91 6.75 17.25 7.09 17.25 7.5V12.33Z"
                                fill="#DF826C"
                              />
                            </svg>
                          </div>
                        </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-5 col-12 d3-card-parent col-sm-6 col-12" >
                      <div className="row">
                        <div className="col-lg-7">
                          <div
                            class="d3-card"
                            onClick={async () => {
                              await localStorage.setItem("stab", "Menu");
                              navigate("/Menu");
                            }}
                          >
                            <div class="d3-card-img">
                              <img src="images/menu/Frame126.png" alt="" />
                            </div>

                            <div>
                              <h5>Food Categories</h5>
                              <h4>{data?.countCategory}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-5" style={{marginLeft:"-15px"}}>
                          <div className="d3-card pe-2">
                            <div>
                              <h5>Total Admin Commision</h5>
                              <h4>
                                <span>₹</span>
                                {data?.totalRevenue?.toFixed(2)}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="row"style={{marginLeft:"-15px"}}>
                        <div class="col-xl-7">
                          <div class="card pending">
                            <div class="card-body d-flex align-items-center gap-3">
                              <div class="">
                                <small class="text-black">
                                  {/* <img src="images/menu/Frame126.png" alt="" /> */}

                                  <svg
                                    width="55"
                                    height="50"
                                    viewBox="0 0 55 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="55"
                                      height="50"
                                      rx="18"
                                      fill="white"
                                    />
                                    <path
                                      d="M35.9697 23H19.9697V31C19.9697 34 20.9697 35 23.9697 35H31.9697C34.9697 35 35.9697 34 35.9697 31V23Z"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M37.5 20V21C37.5 22.1 36.97 23 35.5 23H20.5C18.97 23 18.5 22.1 18.5 21V20C18.5 18.9 18.97 18 20.5 18H35.5C36.97 18 37.5 18.9 37.5 20Z"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M27.6398 17.9999H22.1198C21.7798 17.6299 21.7898 17.0599 22.1498 16.6999L23.5698 15.2799C23.9398 14.9099 24.5498 14.9099 24.9198 15.2799L27.6398 17.9999Z"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M33.8696 17.9999H28.3496L31.0696 15.2799C31.4396 14.9099 32.0496 14.9099 32.4196 15.2799L33.8396 16.6999C34.1996 17.0599 34.2096 17.6299 33.8696 17.9999Z"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M24.9404 23V28.14C24.9404 28.94 25.8204 29.41 26.4904 28.98L27.4304 28.36C27.7704 28.14 28.2004 28.14 28.5304 28.36L29.4204 28.96C30.0804 29.4 30.9704 28.93 30.9704 28.13V23H24.9404Z"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-miterlimit="10"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </small>
                              </div>
                              <div class="menu">
                                <span class="font-w500 fs-16 d-block mb-2 text-black">
                                  Pending Orders
                                </span>
                                <h4>{data?.countPendingOrder}</h4>
                                {/* {ordersCount.countPendingOrder} */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-xl-5" style={{marginLeft:"-15px"}}>
                          <div class="card active-orders">
                            <div class="card-body d-flex align-items-center gap-3">
                              <div class="">
                                <small class="text-black">
                                  {/* <img src="images/menu/Frame126.png" alt="" /> */}

                                  <svg
                                    width="55"
                                    height="50"
                                    viewBox="0 0 55 50"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <rect
                                      width="55"
                                      height="50"
                                      rx="18"
                                      fill="white"
                                    />
                                    <path
                                      d="M38 25C38 30.52 33.52 35 28 35C22.48 35 18 30.52 18 25C18 19.48 22.48 15 28 15C33.52 15 38 19.48 38 25Z"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                    <path
                                      d="M31.7099 28.1798L28.6099 26.3298C28.0699 26.0098 27.6299 25.2398 27.6299 24.6098V20.5098"
                                      stroke="#292D32"
                                      stroke-width="1.5"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                </small>
                              </div>
                              <div class="menu" >
                                <span class="font-w500 fs-16 d-block mb-2 text-black">
                                  Active Orders
                                </span>
                                <h4>{data?.countActiveOrder}</h4>
                                {/* {ordersCount.countActiveOrder} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
          {/*  */}
          <div>
      <style>{customStyles}</style>
      <div
        className="modal fade"
        id="calendarModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Select Day</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Calendar
                value={date}
                onChange={(e) => setDate(e)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (date !== "") {
                    setSelected("date");
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
                        setSelected("week");
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
                        setSelected("month");
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
                        setSelected("year");
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
          {/*  */}
          <div
            class="modal fade"
            id="filterModal"
            tabindex="-1"
            aria-labelledby="filterModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="filterModalLabel">
                    Select Filter Period
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <h4>Start Date</h4>
                  <Calendar
                    value={fsdate}
                    onChange={(e) => {
                      setfsDate(e);
                    }}
                  />
                  <h4>End Date</h4>
                  <Calendar
                    value={fedate}
                    minDate={fsdate}
                    onChange={(e) => {
                      if (fsdate !== "") {
                        setfeDate(e);
                      } else {
                        alert("Please Select Start Date First .");
                      }
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
                      if (fsdate.length !== "" && fedate !== "") {
                        GetData2("filter");
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
        </div>
      )}

      {load && <Loader />}
    </>
  );
};

export default Dashboard;
