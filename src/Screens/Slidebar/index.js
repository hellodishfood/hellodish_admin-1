import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

function Slidebar() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const selected = localStorage.getItem("stab");
  console.log(selected);

  const LogoutUser = () => {
    signOut();
  };
  return (
    <div className="deznav">
      <nav className="deznav-scroll">
        <ul style={{ listStyle: "none" }} className="metismenu" id="menu">
          <li>
            <Link
              to="/Dashboard"
              style={{
                backgroundColor: selected === "Dashboard" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Dashboard");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M9.02 3.34016L3.63 7.54016C2.73 8.24016 2 9.73016 2 10.8602V18.2702C2 20.5902 3.89 22.4902 6.21 22.4902H17.79C20.11 22.4902 22 20.5902 22 18.2802V11.0002C22 9.79016 21.19 8.24016 20.2 7.55016L14.02 3.22016C12.62 2.24016 10.37 2.29016 9.02 3.34016Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 18.4902V15.4902"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Dashboard" ? "white" : "black" }}
              >
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/Restaurant"
              style={{
                backgroundColor: selected === "Restaurant" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Restaurant");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M3.01001 11.7202V16.2102C3.01001 20.7002 4.81001 22.5002 9.30001 22.5002H14.69C19.18 22.5002 20.98 20.7002 20.98 16.2102V11.7202"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12.5C13.83 12.5 15.18 11.01 15 9.18L14.34 2.5H9.66999L8.99999 9.18C8.81999 11.01 10.17 12.5 12 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.31 12.5C20.33 12.5 21.81 10.86 21.61 8.85L21.33 6.1C20.97 3.5 19.97 2.5 17.35 2.5H14.3L15 9.51C15.17 11.16 16.66 12.5 18.31 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.63988 12.5C7.28988 12.5 8.77988 11.16 8.93988 9.51L9.15988 7.3L9.63988 2.5H6.58988C3.96988 2.5 2.96988 3.5 2.60988 6.1L2.33988 8.85C2.13988 10.86 3.61988 12.5 5.63988 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.5C10.33 17.5 9.5 18.33 9.5 20V22.5H14.5V20C14.5 18.33 13.67 17.5 12 17.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Restaurant" ? "white" : "black" }}
              >
                Restaurant
              </span>
            </Link>
          </li>

          <li>
            <Link
              to="/Report"
              style={{
                backgroundColor: selected === "Report" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Report");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M3.01001 11.7202V16.2102C3.01001 20.7002 4.81001 22.5002 9.30001 22.5002H14.69C19.18 22.5002 20.98 20.7002 20.98 16.2102V11.7202"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12.5C13.83 12.5 15.18 11.01 15 9.18L14.34 2.5H9.66999L8.99999 9.18C8.81999 11.01 10.17 12.5 12 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.31 12.5C20.33 12.5 21.81 10.86 21.61 8.85L21.33 6.1C20.97 3.5 19.97 2.5 17.35 2.5H14.3L15 9.51C15.17 11.16 16.66 12.5 18.31 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.63988 12.5C7.28988 12.5 8.77988 11.16 8.93988 9.51L9.15988 7.3L9.63988 2.5H6.58988C3.96988 2.5 2.96988 3.5 2.60988 6.1L2.33988 8.85C2.13988 10.86 3.61988 12.5 5.63988 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.5C10.33 17.5 9.5 18.33 9.5 20V22.5H14.5V20C14.5 18.33 13.67 17.5 12 17.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Report" ? "white" : "black" }}
              >
                Report
              </span>
            </Link>
          </li>
          
          {/* <li>
            <Link
              to="/Reportdetail"
              style={{
                backgroundColor: selected === "Reportdetail" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Reportdetail");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M3.01001 11.7202V16.2102C3.01001 20.7002 4.81001 22.5002 9.30001 22.5002H14.69C19.18 22.5002 20.98 20.7002 20.98 16.2102V11.7202"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12.5C13.83 12.5 15.18 11.01 15 9.18L14.34 2.5H9.66999L8.99999 9.18C8.81999 11.01 10.17 12.5 12 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.31 12.5C20.33 12.5 21.81 10.86 21.61 8.85L21.33 6.1C20.97 3.5 19.97 2.5 17.35 2.5H14.3L15 9.51C15.17 11.16 16.66 12.5 18.31 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.63988 12.5C7.28988 12.5 8.77988 11.16 8.93988 9.51L9.15988 7.3L9.63988 2.5H6.58988C3.96988 2.5 2.96988 3.5 2.60988 6.1L2.33988 8.85C2.13988 10.86 3.61988 12.5 5.63988 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.5C10.33 17.5 9.5 18.33 9.5 20V22.5H14.5V20C14.5 18.33 13.67 17.5 12 17.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Reportdetail" ? "white" : "black" }}
              >
                Reportdetail
              </span>
            </Link>
          </li> */}
{/* 
          <li>
            <Link
              to="/Reportrestront"
              style={{
                backgroundColor: selected === "Reportrestront" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Reportrestront");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M3.01001 11.7202V16.2102C3.01001 20.7002 4.81001 22.5002 9.30001 22.5002H14.69C19.18 22.5002 20.98 20.7002 20.98 16.2102V11.7202"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 12.5C13.83 12.5 15.18 11.01 15 9.18L14.34 2.5H9.66999L8.99999 9.18C8.81999 11.01 10.17 12.5 12 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.31 12.5C20.33 12.5 21.81 10.86 21.61 8.85L21.33 6.1C20.97 3.5 19.97 2.5 17.35 2.5H14.3L15 9.51C15.17 11.16 16.66 12.5 18.31 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.63988 12.5C7.28988 12.5 8.77988 11.16 8.93988 9.51L9.15988 7.3L9.63988 2.5H6.58988C3.96988 2.5 2.96988 3.5 2.60988 6.1L2.33988 8.85C2.13988 10.86 3.61988 12.5 5.63988 12.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 17.5C10.33 17.5 9.5 18.33 9.5 20V22.5H14.5V20C14.5 18.33 13.67 17.5 12 17.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Reportrestront" ? "white" : "black" }}
              >
                Reportrestront
              </span>
            </Link>
          </li> */}
          <li>
            <Link
              to="/Menu"
              style={{
                backgroundColor: selected === "Menu" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Menu");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M21.9299 7.26001L18.5599 20.79C18.3199 21.8 17.4199 22.5 16.3799 22.5H3.23989C1.72989 22.5 0.649901 21.0199 1.0999 19.5699L5.30989 6.05005C5.59989 5.11005 6.46991 4.45996 7.44991 4.45996H19.7499C20.6999 4.45996 21.4899 5.03997 21.8199 5.83997C22.0099 6.26997 22.0499 6.76001 21.9299 7.26001Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                  />
                  <path
                    d="M16 22.5H20.78C22.07 22.5 23.08 21.41 22.99 20.12L22 6.5"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.67993 6.88L10.7199 2.56006"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.3799 6.88977L17.3199 2.5498"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.69995 12.5H15.7"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.69995 16.5H14.7"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Menu" ? "white" : "black" }}
              >
                Menu
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/Driver"
              style={{
                backgroundColor: selected === "Driver" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Driver");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                  width="32.000000pt" height="32.000000pt" viewBox="0 0 32.000000 32.000000"
                  preserveAspectRatio="xMidYMid meet">

                  <g transform="translate(0.000000,32.000000) scale(0.100000,-0.100000)"
                    fill="#db1d1d" stroke="none">
                    <path d="M122 293 c-11 -20 2 -63 17 -63 6 0 8 -7 4 -16 -5 -12 -15 -15 -44
-11 -38 5 -38 5 -37 -30 1 -27 3 -31 11 -18 8 14 11 15 18 4 6 -10 9 -11 9 -1
0 6 12 12 27 12 21 0 24 -3 15 -12 -7 -7 -12 -21 -12 -32 -1 -29 -26 -61 -34
-44 -3 7 -5 4 -2 -8 4 -23 -9 -26 -58 -17 -28 5 -29 6 -11 19 16 12 21 11 39
-3 12 -10 15 -11 9 -3 -7 8 -13 22 -13 31 0 15 -6 12 -32 -11 -30 -28 -31 -29
-14 -54 19 -29 33 -32 60 -11 26 20 110 20 126 0 32 -38 80 -1 80 62 0 32 4
42 20 46 16 4 20 14 20 47 l0 41 -42 -3 c-42 -3 -43 -4 -46 -40 -4 -44 -22
-52 -22 -10 -1 15 -7 38 -14 51 -7 13 -11 32 -8 43 10 40 -48 67 -66 31z m56
-19 c3 -22 -21 -39 -39 -28 -15 9 -10 27 6 20 8 -3 15 -1 15 4 0 6 -7 10 -15
10 -8 0 -15 5 -15 11 0 20 45 5 48 -17z m12 -63 c16 -31 12 -51 -10 -51 -22 0
-26 10 -8 28 8 8 8 15 -2 27 -8 10 -9 15 -2 15 6 0 16 -9 22 -19z m-30 -16
c-7 -8 -20 -15 -28 -15 -13 0 -12 3 4 15 25 19 40 19 24 0z m150 0 c0 -10 -10
-15 -29 -15 -16 0 -31 6 -35 15 -4 12 3 15 29 15 24 0 35 -5 35 -15z m-225 -5
c3 -5 1 -10 -4 -10 -6 0 -11 5 -11 10 0 6 2 10 4 10 3 0 8 -4 11 -10z m225
-35 c0 -10 -11 -15 -35 -15 -24 0 -35 5 -35 15 0 10 11 15 35 15 24 0 35 -5
35 -15z m-115 -15 c-4 -6 11 -11 37 -11 36 -2 38 -3 13 -7 -29 -5 -29 -5 -6
-11 14 -4 27 -13 29 -21 5 -13 3 -13 -11 -1 -22 18 -64 7 -72 -19 -5 -16 -14
-20 -43 -19 -30 2 -32 3 -9 6 21 3 27 10 27 29 0 18 5 24 21 24 11 0 17 5 14
10 -12 20 -45 11 -46 -12 -1 -18 -2 -19 -6 -5 -8 29 5 47 32 47 15 0 24 -4 20
-10z m63 -62 c21 -21 13 -28 -28 -28 -41 0 -49 7 -28 28 15 15 41 15 56 0z
m-111 -4 c-3 -3 -12 -4 -19 -1 -8 3 -5 6 6 6 11 1 17 -2 13 -5z m-84 -34 c8 0
8 -3 0 -11 -13 -13 -43 -5 -43 12 0 6 7 8 16 5 9 -3 21 -6 27 -6z m192 -10
c-3 -6 -15 -10 -25 -10 -10 0 -22 5 -25 10 -4 6 7 10 25 10 18 0 29 -4 25 -10z"/>
                    <path d="M82 120 c0 -14 2 -19 5 -12 2 6 2 18 0 25 -3 6 -5 1 -5 -13z" />
                  </g>
                </svg>

              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Driver" ? "white" : "black" }}
              >
                Drivers
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/Users"
              style={{
                backgroundColor: selected === "Users" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Users");
              }}
            >
              {" "}
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M18.0001 7.66C17.9401 7.65 17.8701 7.65 17.8101 7.66C16.4301 7.61 15.3301 6.48 15.3301 5.08C15.3301 3.65 16.4801 2.5 17.9101 2.5C19.3401 2.5 20.4901 3.66 20.4901 5.08C20.4801 6.48 19.3801 7.61 18.0001 7.66Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.9702 14.9402C18.3402 15.1702 19.8502 14.9302 20.9102 14.2202C22.3202 13.2802 22.3202 11.7402 20.9102 10.8002C19.8402 10.0902 18.3102 9.85016 16.9402 10.0902"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.96998 7.66C6.02998 7.65 6.09998 7.65 6.15998 7.66C7.53998 7.61 8.63998 6.48 8.63998 5.08C8.63998 3.65 7.48998 2.5 6.05998 2.5C4.62998 2.5 3.47998 3.66 3.47998 5.08C3.48998 6.48 4.58998 7.61 5.96998 7.66Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.99994 14.9402C5.62994 15.1702 4.11994 14.9302 3.05994 14.2202C1.64994 13.2802 1.64994 11.7402 3.05994 10.8002C4.12994 10.0902 5.65994 9.85016 7.02994 10.0902"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0001 15.1302C11.9401 15.1202 11.8701 15.1202 11.8101 15.1302C10.4301 15.0802 9.33008 13.9502 9.33008 12.5502C9.33008 11.1202 10.4801 9.97021 11.9101 9.97021C13.3401 9.97021 14.4901 11.1302 14.4901 12.5502C14.4801 13.9502 13.3801 15.0902 12.0001 15.1302Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.08997 18.2804C7.67997 19.2204 7.67997 20.7603 9.08997 21.7003C10.69 22.7703 13.31 22.7703 14.91 21.7003C16.32 20.7603 16.32 19.2204 14.91 18.2804C13.32 17.2204 10.69 17.2204 9.08997 18.2804Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Users" ? "white" : "black" }}
              >
                Users
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/Orders"
              style={{
                backgroundColor: selected === "Orders" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Orders");
              }}
            >
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M7.5 8.17001V7.20001C7.5 4.95001 9.31 2.74001 11.56 2.53001C14.24 2.27001 16.5 4.38001 16.5 7.01001V8.39001"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.99983 22.5H14.9998C19.0198 22.5 19.7398 20.89 19.9498 18.93L20.6998 12.93C20.9698 10.49 20.2698 8.5 15.9998 8.5H7.99983C3.72983 8.5 3.02983 10.49 3.29983 12.93L4.04983 18.93C4.25983 20.89 4.97983 22.5 8.99983 22.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.4955 12.5H15.5045"
                    stroke="#db1d1d"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.49451 12.5H8.50349"
                    stroke="#db1d1d"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Orders" ? "white" : "black" }}
              >
                Orders
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/Banner-promotions"
              style={{
                backgroundColor: selected === "Banner" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "Banner");
              }}
            >
              {" "}
              <i style={{ backgroundColor: "white" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M21.6599 10.94L20.6799 15.12C19.8399 18.73 18.1799 20.19 15.0599 19.89C14.5599 19.85 14.0199 19.76 13.4399 19.62L11.7599 19.22C7.58994 18.23 6.29994 16.17 7.27994 11.99L8.25994 7.80001C8.45994 6.95001 8.69994 6.21001 8.99994 5.60001C10.1699 3.18001 12.1599 2.53001 15.4999 3.32001L17.1699 3.71001C21.3599 4.69001 22.6399 6.76001 21.6599 10.94Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.0601 19.8901C14.4401 20.3101 13.6601 20.6601 12.7101 20.9701L11.1301 21.4901C7.1601 22.7701 5.0701 21.7001 3.7801 17.7301L2.5001 13.7801C1.2201 9.8101 2.2801 7.7101 6.2501 6.4301L7.8301 5.9101C8.2401 5.7801 8.6301 5.6701 9.0001 5.6001C8.7001 6.2101 8.4601 6.9501 8.2601 7.8001L7.2801 11.9901C6.3001 16.1701 7.5901 18.2301 11.7601 19.2201L13.4401 19.6201C14.0201 19.7601 14.5601 19.8501 15.0601 19.8901Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.6399 9.02979L17.4899 10.2598"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.6599 12.8999L14.5599 13.6399"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "Banner" ? "white" : "black" }}
              >
                Banners &amp; Promotions
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/PolicySupport"
              style={{
                backgroundColor: selected === "PolicySupport" ? "#db1d1d" : "white",
                borderRadius: 13,
              }}
              onClick={async () => {
                await localStorage.setItem("stab", "PolicySupport");
              }}
            >
              {" "}
              <i style={{ backgroundColor: "white" }}>
                <svg
                  width={24}
                  height={25}
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22.5H15C20 22.5 22 20.5 22 15.5V9.5C22 4.5 20 2.5 15 2.5H9C4 2.5 2 4.5 2 9.5V15.5C2 20.5 4 22.5 9 22.5Z"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.75 9.5H8.25"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.75 15.5H8.25"
                    stroke="#db1d1d"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span
                className="nav-text"
                style={{ color: selected === "PolicySupport" ? "white" : "black" }}
              >
                Policies & Support
              </span>
            </Link>
          </li>
          <li
            className="logout-link"
            style={{ cursor: "pointer" }}
            onClick={LogoutUser}
          >
            {/* <Link to="/Login"> */}
            <a className="logout-link-in">
              <i style={{ backgroundColor: "white" }}>
                <svg
                  width={23}
                  height={21}
                  viewBox="0 0 23 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.6897 13.4475L22 10.5675L18.6897 7.6875M8.75862 10.5675H21.9095M11.3448 19.5C5.62931 19.5 1 16.125 1 10.5C1 4.875 5.62931 1.5 11.3448 1.5"
                    stroke="#DB1D1D"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </i>
              <span className="nav-text">Log out</span>
            </a>
            {/* </Link> */}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Slidebar;
