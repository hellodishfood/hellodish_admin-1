import { React, useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { baseurl, token, UpdateRestaurantTimeApi } from "../../Utilities/Api";
import { Link } from "react-router-dom";
import { useHelloDishApp } from "../../contexts/HelloDishAppProvider";
import Loader from "../Loader";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

function RestaurantDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { UpdateData } = useHelloDishApp();
  const [ordersData, setOrdersData] = useState([]);
  const [RestaurantDetails_state, setRestaurantDetails_state] = useState({});
  const [TimingDetails_state, setTimingDetails_state] = useState([]);
  const [BankDetails_state, setBankDetails_state] = useState({});
  const [detail, setDetail] = useState(null);
  const [ownerName, setOwnerName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [fssaiNumber, setFssaiNumber] = useState("");
  const [comission, setComission] = useState("");
  const [load, setLoad] = useState(false);
  ///////
  const [monday, setMonday] = useState(0);
  const [tuesday, setTuesday] = useState(0);
  const [wednesday, setWednesday] = useState(0);
  const [thursday, setThursday] = useState(0);
  const [friday, setFriday] = useState(0);
  const [saturday, setSaturday] = useState(0);
  const [sunday, setSunday] = useState(0);

  const [openingHours, setOpeningHours] = useState({
    monday: { open: "", close: "" },
    tuesday: { open: "", close: "" },
    wednesday: { open: "", close: "" },
    thursday: { open: "", close: "" },
    friday: { open: "", close: "" },
    saturday: { open: "", close: "" },
    sunday: { open: "", close: "" },
  });

  function modifyTimeFormat(obj) {
    const modifiedObject = { ...obj };
    for (const key in modifiedObject) {
      if ((key.endsWith("Time") && key !== "sameTime") || key === "time") {
        const timeValue = modifiedObject[key];
        console.log(timeValue);
        const [startTime, endTime] = timeValue
          ?.split(" - ")
          ?.map((time) => time.trim());
        modifiedObject[key] = [startTime, endTime];
      }
    }
    return modifiedObject;
  }

  function revertTimeFormat(modifiedObj) {
    const revertedObject = { ...modifiedObj };

    for (const key in revertedObject) {
      if ((key.endsWith("Time") && key !== "sameTime") || key === "time") {
        const [startTime, endTime] = revertedObject[key];
        revertedObject[key] = `${startTime} - ${endTime}`;
      }
    }
    return revertedObject;
  }

  useEffect(() => {
    // Retrieve data from location state and save it in the component state
    console.log("location?.state", location?.state);
    const data = location?.state?.data;
    const restaurantDetailsData = data?.restaurant;
    const bankDetailsData = data?.bankDetails;
    const timingDetailsData = data?.timingDetails;
    const modifiedTimeObject = modifyTimeFormat(timingDetailsData);
    console.log("hkgdfaig", data);
    setOrdersData(data?.orders);
    setRestaurantDetails_state(restaurantDetailsData);
    setTimingDetails_state(modifiedTimeObject);
    setBankDetails_state(bankDetailsData);
    setOwnerName(restaurantDetailsData?.ownerName);
    setComission(restaurantDetailsData?.commission);
    setRestaurantName(restaurantDetailsData?.restaurantName);
    setRestaurantAddress(restaurantDetailsData?.restaurantAddress);
    setPanNumber(bankDetailsData?.panNumber);
    setGstNumber(bankDetailsData?.gstNumber);
    setBankName(bankDetailsData?.bankName);
    setBankAccountNumber(bankDetailsData?.bankAccountNumber);
    setIfscCode(bankDetailsData?.ifscCode);
    setFssaiNumber(bankDetailsData?.fssaiNumber);
    setMonday(timingDetailsData?.monday);
    setTuesday(timingDetailsData?.tuesday);
    setWednesday(timingDetailsData?.wednesday);
    setThursday(timingDetailsData?.thursday);
    setFriday(timingDetailsData?.friday);
    setSaturday(timingDetailsData?.saturday);
    setSunday(timingDetailsData?.sunday);
    const calculatedHours = transformTimingDetails(timingDetailsData);
    console.log("calculatedHours", calculatedHours);
    if (calculatedHours !== null && calculatedHours !== undefined) {
      setOpeningHours(calculatedHours);
    }
    setDetail(data);
  }, [location]);

  function transformTimingDetails(timingDetails) {
    debugger;
    const calculatedHours = {};
    const days = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    // Function to convert time from "HH:mm - HH:mm" format to "h:mm A" format
    function formatTimeRange(timeRange) {
      const [open, close] = timeRange.split(" - ");
      const formattedOpen = new Date(`2000-01-01T${open}`).toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "2-digit" }
      );
      const formattedClose = new Date(`2000-01-01T${close}`).toLocaleTimeString(
        "en-US",
        { hour: "numeric", minute: "2-digit" }
      );
      return { open: formattedOpen, close: formattedClose };
    }

    days.forEach((day) => {
      calculatedHours[day] = formatTimeRange(timingDetails[`${day}Time`]);
    });

    return calculatedHours;
  }

  const handleSubmit = () => {
    // alert("save click");
    // UpdateTimingDetails()
    updateProfile();
  };

  const updateProfile = async () => {
    setLoad(true);
    // const token = await localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      ownerName: ownerName,
      commission: comission,
      restaurantName: restaurantName,
      restaurantAddress: restaurantAddress,
      restaurantLat: RestaurantDetails_state?.restaurantLat,
      restaurantLong: RestaurantDetails_state?.restaurantLong,
      onlineOffline: RestaurantDetails_state?.onlineOffline,
      active: RestaurantDetails_state?.active,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${baseurl}admin/api/updateRestaurantProfile/${RestaurantDetails_state?._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          UpdateBank(token);
        } else {
          setLoad(false);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const UpdateBank = (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      panNumber: panNumber,
      gstNumber: gstNumber,
      bankName: bankName,
      bankHolderName: BankDetails_state.bankHolderName,
      bankAccountNumber: bankAccountNumber,
      ifscCode: ifscCode,
      fssaiNumber: fssaiNumber,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${baseurl}admin/api/updateBankInfo/${RestaurantDetails_state?._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          UpdateTiming(token);
        } else {
          setLoad(false);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const UpdateTiming = (token) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    const Timing_state = revertTimeFormat(TimingDetails_state);
    const raw = JSON.stringify({
      monday: monday,
      mondayTime: Timing_state.mondayTime,
      tuesday: tuesday,
      tuesdayTime: Timing_state.tuesdayTime,
      wednesday: wednesday,
      wednesdayTime: Timing_state.wednesdayTime,
      thursday: thursday,
      thursdayTime: Timing_state.thursdayTime,
      friday: friday,
      fridayTime: Timing_state.fridayTime,
      saturday: saturday,
      saturdayTime: Timing_state.saturdayTime,
      sunday: sunday,
      sundayTime: Timing_state.sundayTime,
      sameTime: Timing_state?.sameTime,
      time: Timing_state.time,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${baseurl}admin/api/updateRestaurantTime/${RestaurantDetails_state?._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.success === true) {
          navigate("/Restaurant");
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };
  const [value, onChange] = useState(["10:00", "11:00"]);

  const [timeRanges, setTimeRanges] = useState([
    {
      id: 0,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 1,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 2,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 3,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 4,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 5,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 6,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
    {
      id: 7,
      fromHour: "--",
      fromMinute: "--",
      fromAmPm: "am",
      toHour: "--",
      toMinute: "--",
      toAmPm: "am",
    },
  ]);
  const formatTime = (hour, minute, amPm) => {
    return (
      (hour < 10 ? "0" + hour : hour) +
      ":" +
      (minute < 10 ? "0" + minute : minute)
      //  +
      // " " +
      // amPm.toUpperCase()
    );
  };
  const handleTimeChange = (id, field, value) => {
    setTimeRanges((prevState) =>
      prevState.map((timeRange) =>
        timeRange.id === id ? { ...timeRange, [field]: value } : timeRange
      )
    );
  };
  const getTimeRange = (id) => {
    const timeRange = timeRanges.find((range) => range.id === id);
    let fromHour = parseInt(timeRange.fromHour);
    let toHour = parseInt(timeRange.toHour);
    if (timeRange.fromAmPm === "pm" && fromHour <= 12) {
      fromHour += 12;
    }
    if (timeRange.toAmPm === "pm" && toHour <= 12) {
      toHour += 12;
    }
    let fromTime = formatTime(
      fromHour,
      parseInt(timeRange.fromMinute),
      timeRange.fromAmPm
    );
    let toTime = formatTime(
      toHour,
      parseInt(timeRange.toMinute),
      timeRange.toAmPm
    );
    return fromTime + " - " + toTime;
  };
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
                    <h2 className=" me-auto">{restaurantName}</h2>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <li class="nav-item">
                    {/* <span class="btn main_btn d-flex justify-content-between gap-5" >
                     <span>Resturent Commision</span> <span>  20</span>
                    </span> */}
                  </li>
                  <div className="resto-on d-flex">
                    <div>
                      <h5>Restaurant</h5>
                      <h5 style={{marginLeft:"91px",marginTop:"-26px"}}>Approved</h5>
                    </div>
                    <div className="form-check form-switch pt-10px">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckChecked"
                        checked={RestaurantDetails_state?.active === 1}
                        onChange={() => {
                          setRestaurantDetails_state((prevState) => ({
                            ...prevState,
                            active:
                              RestaurantDetails_state?.active === 0 ? 1 : 0,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div style={{height:"40px",width:"80px",marginBottom:"15px"}}>
                  <div className="mid-done-btn">
                    <button
                      type="button"
                      className="btn main_btn w-100 mt-2"
                      onClick={() => updateProfile()}
                    >
                      Save
                    </button>
                  </div>
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
        {detail ? (
          <div className="content-body">
            {/* row */}
            <div className="restoo container-fluid">
              <div className="row menu-page">
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card pending">
                    <div className="card-body d-flex align-items-center gap-3">
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
                        <span className="font-w500 fs-15 d-block mb-2 text-black">
                          Pending Orders
                        </span>
                        <h4>{ordersData.countPendingOrder}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card completed">
                    <div className="card-body d-flex align-items-center gap-3">
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
                        <span className="font-w500 fs-15 d-block mb-2 text-black">
                          Completed Orders
                        </span>
                        <h4>{ordersData.countCompleteOrder}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card cancelled">
                    <div className="card-body d-flex align-items-center gap-3">
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
                        <span className="font-w500 fs-15 d-block mb-2 text-black">
                          Cancelled Orders
                        </span>
                        <h4>{ordersData.countCancelOrder}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-12">
                  <div className="card restaurent-status">
                    <div className="card-body d-flex align-items-center justify-content-between">
                      <div className="menu">
                        <span className="font-w500 fs-15 d-block mb-2 text-black">
                          Restaurant Status
                        </span>
                        <h4>Open/Close</h4>
                      </div>
                      <div className="form-check form-switch pt-10px">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          checked={RestaurantDetails_state?.onlineOffline === 1}
                          onChange={() => {
                            setRestaurantDetails_state((prevState) => ({
                              ...prevState,
                              onlineOffline:
                                RestaurantDetails_state?.onlineOffline === 0
                                  ? 1
                                  : 0,
                            }));
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-sm-12 col-12 px-4">
                  <div className="resto-left">
                    <h4>Restaurant Owner Details</h4>
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Owner's full name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ayush manupara"
                      value={ownerName}
                      onChange={(e) => {
                        setOwnerName(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="ayush@gmail.com"
                      value={detail.restaurant.email}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Mobile Number</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="+91 7878787878"
                      value={detail.restaurant.phone}
                    />
                  </div>
                  {/* documcent detail */}
                  <div className="resto-left">
                    <h4>Document Details</h4>
                  </div>
                  <div className="resto-input">
                    <label htmlFor="pan">Owner PAN</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="PAN1248630WA"
                      value={panNumber}
                      onChange={(e) => {
                        setPanNumber(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="gstin">GSTIN</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={"454751547654475484"}
                      value={gstNumber}
                      onChange={(e) => {
                        setGstNumber(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Bank Account Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={"54557878778"}
                      value={bankAccountNumber}
                      onChange={(e) => {
                        setBankAccountNumber(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Bank IFSC Code</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="AVJD45485D"
                      value={ifscCode}
                      onChange={(e) => {
                        setIfscCode(e.target.value.trim());
                      }}
                    />
                  </div>

                  {/* <div className="resto-input">
                    <label htmlFor="email">FSSAI Certificate number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="02780658"
                      value={fssaiNumber}
                      onChange={(e) => {
                        setFssaiNumber(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Admin Commission</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Comission"
                      value={comission}
                      onChange={(e) => {
                        setComission(e.target.value.trim());
                      }}
                    />
                  </div> */}
                </div>
                <div className="col-lg-4 col-sm-6 col-12 px-4">
                  <div className="resto-mid">
                    <h4>Restaurant Details</h4>
                  </div>
                  <div className="resto-input">
                    <label htmlFor="gstin">Restaurant name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Coffee Adda"
                      value={restaurantName}
                      onChange={(e) => {
                        setRestaurantName(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="gstin">Restaurant Address</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Bhakti nagar, Rajkot Gujrat,India"
                      value={restaurantAddress}
                      onChange={(e) => {
                        setRestaurantAddress(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="gstin">FSSAI Certification number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={454712454}
                      value={fssaiNumber}
                      onChange={(e) => {
                        setFssaiNumber(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-input">
                    <label htmlFor="email">Admin Commission</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Comission"
                      value={comission}
                      onChange={(e) => {
                        setComission(e.target.value.trim());
                      }}
                    />
                  </div>
                  <div className="resto-mid-card">
                    <h6>Working Time</h6>
                    <div className="mid-work d-flex">
                      <input
                        type="checkbox"
                        id="vehicle1"
                        // name="worktime1"
                        // defaultValue="Bike"
                        checked={TimingDetails_state?.sameTime === 0}
                        onChange={() => {
                          setTimingDetails_state((prevState) => ({
                            ...prevState,
                            sameTime: 0,
                          }));
                        }}
                      />
                      <label htmlFor="vehicle1"> Day Work timing</label>
                      <br />
                    </div>
                    <div className="mid-work d-flex" >
                      <input

                        onChange={() => {
                          setTimingDetails_state((prevState) => ({
                            ...prevState,
                            sameTime: 1,
                          }));
                        }}
                        type="checkbox"
                        id="vehicle2"
                        // name="worktime1"
                        // defaultValue="Car"
                        checked={TimingDetails_state?.sameTime === 1 ? true : false}

                      />
                      <label htmlFor="vehicle2">
                        Open and close Restaurant of the same timing on all
                        working days
                      </label>
                      <br />
                    </div>
                    {TimingDetails_state?.sameTime === 1 && (
                      <div className="mid-btn d-flex justify-content-between">
                        <TimeRangePicker
                          onChange={(e) => {
                            setTimingDetails_state((prevState) => ({
                              ...prevState,
                              time: e,
                            }));
                          }}
                          value={TimingDetails_state.time}
                          format="hh:mm a"
                        />
                      </div>
                    )}
                  </div>
                  {TimingDetails_state?.sameTime === 0 && (
                    <div className="mid-last mt-4">
                      <h5>Day Wise timing</h5>
                      <h6>Monday</h6>
                      <div className="mid-btn d-flex justify-content-between">
                        <TimeRangePicker
                          onChange={(e) => {
                            setTimingDetails_state((prevState) => ({
                              ...prevState,
                              mondayTime: e,
                            }));
                          }}
                          value={TimingDetails_state.mondayTime}
                          format="hh:mm a"
                        />
                      </div>
                      <h6>Tuesday</h6>
                      <div className="mid-btn d-flex justify-content-between">
                        <TimeRangePicker
                          onChange={(e) => {
                            setTimingDetails_state((prevState) => ({
                              ...prevState,
                              tuesdayTime: e,
                            }));
                          }}
                          value={TimingDetails_state.tuesdayTime}
                          format="hh:mm a"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-lg-4 col-sm-6 col-12 px-4">
                  <div className="resto-right ">
                    <div className="resto-right-card">
                      <svg
                        width={55}
                        height={50}
                        viewBox="0 0 55 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <rect width={55} height={50} rx={18} fill="white" />
                        <path
                          d="M29.7299 14.5101L31.4899 18.0301C31.7299 18.5201 32.3699 18.9901 32.9099 19.0801L36.0999 19.6101C38.1399 19.9501 38.6199 21.4301 37.1499 22.8901L34.6699 25.3701C34.2499 25.7901 34.0199 26.6001 34.1499 27.1801L34.8599 30.2501C35.4199 32.6801 34.1299 33.6201 31.9799 32.3501L28.9899 30.5801C28.4499 30.2601 27.5599 30.2601 27.0099 30.5801L24.0199 32.3501C21.8799 33.6201 20.5799 32.6701 21.1399 30.2501L21.8499 27.1801C21.9799 26.6001 21.7499 25.7901 21.3299 25.3701L18.8499 22.8901C17.3899 21.4301 17.8599 19.9501 19.8999 19.6101L23.0899 19.0801C23.6199 18.9901 24.2599 18.5201 24.4999 18.0301L26.2599 14.5101C27.2199 12.6001 28.7799 12.6001 29.7299 14.5101Z"
                          stroke="#292D32"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div>
                        <p>Rating</p>
                        <h6>{RestaurantDetails_state?.rating}</h6>
                      </div>
                    </div>
                    <div className="day-card">
                      <div className="day-head d-flex justify-content-between align-items-center">
                        <h5>Working days</h5>
                        <h6 className="my-0">SELECT ALL</h6>
                      </div>
                      <div className="day-name d-flex g-14">
                        <div className="days d-block">
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              id="vehicle"
                              name="day"
                              defaultValue="Car"
                              checked={monday === 1}
                              onChange={(e) => {
                                setMonday(monday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle">Monday</label>
                            <br />
                          </div>
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              id="vehicle1"
                              name="day"
                              defaultValue="Car"
                              checked={tuesday === 1}
                              onChange={(e) => {
                                setTuesday(tuesday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle1">Tuesday</label>
                            <br />
                          </div>
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              // id="vehicle2"
                              // name="day"
                              // defaultValue="Car"
                              checked={wednesday === 1}
                              onChange={(e) => {
                                setWednesday(wednesday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle2">Wednesday</label>
                            <br />
                          </div>
                        </div>
                        <div className="days ">
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              id="vehicle3"
                              name="day"
                              defaultValue="Car"
                              checked={thursday === 1}
                              onChange={(e) => {
                                setThursday(thursday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle3">Thursday</label>
                            <br />
                          </div>
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              id="vehicle4"
                              name="day"
                              defaultValue="Car"
                              checked={friday === 1}
                              onChange={(e) => {
                                setFriday(friday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle4">Friday</label>
                            <br />
                          </div>
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              id="vehicle5"
                              name="day"
                              defaultValue="Car"
                              checked={saturday === 1}
                              onChange={(e) => {
                                setSaturday(saturday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle5">Saturday</label>
                            <br />
                          </div>
                        </div>
                        <div className="days ">
                          <div className="mid-work d-flex">
                            <input
                              type="checkbox"
                              id="vehicle6"
                              name="day"
                              defaultValue="Car"
                              checked={sunday === 1}
                              onChange={(e) => {
                                setSunday(sunday === 1 ? 0 : 1);
                              }}
                            />
                            <label htmlFor="vehicle6">Sunday</label>
                            <br />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="resto-right-last">
                      {TimingDetails_state?.sameTime === 0 && (
                        <div>
                          <h6>Wednesday</h6>
                          <div className="mid-btn d-flex justify-content-between">
                            <TimeRangePicker
                              onChange={(e) => {
                                setTimingDetails_state((prevState) => ({
                                  ...prevState,
                                  wednesdayTime: e,
                                }));
                              }}
                              value={TimingDetails_state.wednesdayTime}
                              format="hh:mm a"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    {/* <input aria-label="Time" type="time" /> */}
                    {TimingDetails_state?.sameTime === 0 && (
                      <div>
                        <h6>Thursday</h6>
                        <div className="mid-btn d-flex justify-content-between">
                          <TimeRangePicker
                            onChange={(e) => {
                              setTimingDetails_state((prevState) => ({
                                ...prevState,
                                thursdayTime: e,
                              }));
                            }}
                            value={TimingDetails_state.thursdayTime}
                            format="hh:mm a"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {TimingDetails_state?.sameTime === 0 && (
                    <div>
                      <h6>Friday</h6>
                      <div className="mid-btn d-flex justify-content-between">
                        <TimeRangePicker
                          onChange={(e) => {
                            setTimingDetails_state((prevState) => ({
                              ...prevState,
                              fridayTime: e,
                            }));
                          }}
                          value={TimingDetails_state.fridayTime}
                          format="hh:mm a"
                        />
                      </div>
                    </div>
                  )}
                  {TimingDetails_state?.sameTime === 0 && (
                    <div>
                      <h6>Saturday</h6>
                      <div className="mid-btn d-flex justify-content-between">
                        <TimeRangePicker
                          onChange={(e) => {
                            setTimingDetails_state((prevState) => ({
                              ...prevState,
                              saturdayTime: e,
                            }));
                          }}
                          value={TimingDetails_state.saturdayTime}
                          format="hh:mm a"
                        />
                      </div>
                    </div>
                  )}
                  {TimingDetails_state?.sameTime === 0 && (
                    <div>
                      <h6>Sunday</h6>
                      <div className="mid-btn d-flex justify-content-between">
                        <TimeRangePicker
                          onChange={(e) => {
                            setTimingDetails_state((prevState) => ({
                              ...prevState,
                              sundayTime: e,
                            }));
                          }}
                          value={TimingDetails_state.sundayTime}
                          format="hh:mm a"
                        />
                      </div>
                    </div>
                  )}
                </div>
             
              </div>
            </div>
            {load && <Loader />}
          </div>
        ) : (
          <p>Loading...</p>
        )}
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

export default RestaurantDetails;
