import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";

const validationSchema = yup.object().shape({
  title: yup.string().required("Title is required").trim("Title is required"),
  body: yup.string().required("Body is required").trim("Body is required"),
  // image: yup.string().required("Image is required"),
  status: yup.string().required("Please select one option"),
});

const BannersPromotions = () => {
  useEffect(() => {
    GetData();
  }, []);

  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);
  const recordsPerPage = 6;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const formik = useFormik({
    initialValues: {
      title: "",
      body: "",
      image: "",
      status: "",
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      if (formik.values.image === "") {
        AddNotification("");
      } else {
        UploadImage();
      }
    },
  });

  const handleChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    formik.setFieldValue("image", file);
  };

  const UploadImage = async () => {
    setLoad(true);
    try {
      const formdata = new FormData();
      formdata.append("image", formik.values.image);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `https://api.hellodish.in/driver/api/uploadImage`,
        requestOptions
      );
      const result = await response.json();
      setLoad(false);
      if (result.success === true) {
        AddNotification(result.data);
      }
    } catch (error) {
      setLoad(false);
      console.error("Error uploading image:", error);
    }
  };

  const AddNotification = (image) => {
    setLoad(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI"
    );

    const raw = JSON.stringify({
      title: formik.values.title,
      body: formik.values.body,
      image: image,
      status: formik.values.status,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/addBannerPramotion`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          formik.handleReset();
          setImage("");
          GetData();
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const GetData = () => {
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

    fetch(`${baseurl}admin/api/getAllBannerPramotionByAdmin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          const sorted = result?.banner?.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setData(sorted);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
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
        <div class="nav-header">
          <Link to="/Home" className="brand-logo">
          <svg width="100" height="128" viewBox="0 0 100 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.588 107.691H21.487L21.253 109.581C21.253 109.581 21.253 109.584 21.253 109.59C21.253 109.596 21.253 109.602 21.253 109.608L21.226 109.851L21.1 110.868L21.064 111.111L21.028 111.462L20.992 111.705L20.974 111.903L20.947 112.092V112.119V112.128L20.938 112.182L20.866 112.758L20.848 112.875L20.713 114.018H18.805L18.814 113.982L18.913 113.154L19.039 112.128L19.12 111.498V111.48H15.916L15.862 111.93L15.601 114.018H13.702L13.945 112.002L14.323 108.978L13.441 107.718H16.375L16.321 108.213L16.15 109.608L16.114 109.851L16.105 109.959L15.988 110.004L15.439 110.22H19.273V110.202L19.282 110.184V110.175V110.166L19.318 109.851V109.842L19.345 109.608L19.426 108.951L19.453 108.753L19.48 108.51L19.579 107.718L19.588 107.691ZM21.9444 107.7H28.7304C28.9044 107.7 29.0574 107.724 29.1894 107.772C29.3214 107.82 29.4264 107.883 29.5044 107.961C29.5824 108.033 29.6454 108.114 29.6934 108.204C29.7474 108.288 29.7834 108.375 29.8014 108.465C29.8194 108.555 29.8314 108.639 29.8374 108.717C29.8434 108.789 29.8434 108.849 29.8374 108.897L29.8284 108.96L29.7654 109.482C29.7594 109.512 29.7564 109.548 29.7564 109.59H24.0234L24.6174 109.833L24.5724 110.22H27.1374L26.9844 111.48H24.4194L24.3924 111.723L24.3834 111.759L24.3654 111.876V111.912L24.3384 112.11H29.4504L29.3694 112.74C29.3634 112.776 29.3544 112.824 29.3424 112.884C29.3304 112.938 29.2914 113.037 29.2254 113.181C29.1654 113.325 29.0874 113.454 28.9914 113.568C28.9014 113.676 28.7634 113.775 28.5774 113.865C28.3974 113.955 28.1904 114 27.9564 114H22.2054L22.3044 113.172L22.8264 108.96L21.9444 107.7ZM30.2282 107.7H33.1622L33.1082 108.195L32.9372 109.59L32.9012 109.833L32.8562 110.211L32.7032 111.462L32.6492 111.912L32.6222 112.11H36.9152L36.8342 112.74L36.6812 114H30.4892L30.7322 111.993L31.1102 108.96L30.2282 107.7ZM37.5014 107.7H40.4354L40.3814 108.195L40.2104 109.59L40.1744 109.833L40.1294 110.211L39.9764 111.462L39.9224 111.912L39.8954 112.11H44.1884L44.1074 112.74L43.9544 114H37.7624L38.0054 111.993L38.3834 108.96L37.5014 107.7ZM46.3765 107.7H46.6285H51.0205C51.1945 107.7 51.3475 107.724 51.4795 107.772C51.6175 107.82 51.7225 107.883 51.7945 107.961C51.8725 108.033 51.9355 108.114 51.9835 108.204C52.0375 108.288 52.0735 108.375 52.0915 108.465C52.1095 108.555 52.1215 108.639 52.1275 108.717C52.1335 108.789 52.1335 108.849 52.1275 108.897V108.96L52.0645 109.482C52.0585 109.512 52.0525 109.548 52.0465 109.59L52.0195 109.833L51.8935 110.85L51.8665 111.093L51.7405 112.11L51.6595 112.74C51.6535 112.776 51.6445 112.824 51.6325 112.884C51.6205 112.938 51.5815 113.037 51.5155 113.181C51.4555 113.325 51.3805 113.454 51.2905 113.568C51.2005 113.676 51.0625 113.775 50.8765 113.865C50.6905 113.955 50.4805 114 50.2465 114H45.7555C45.5875 114 45.4375 113.979 45.3055 113.937C45.1735 113.889 45.0685 113.832 44.9905 113.766C44.9185 113.694 44.8555 113.613 44.8015 113.523C44.7475 113.427 44.7115 113.34 44.6935 113.262C44.6755 113.184 44.6605 113.103 44.6485 113.019C44.6425 112.929 44.6395 112.869 44.6395 112.839C44.6455 112.803 44.6485 112.773 44.6485 112.749L44.8465 111.183L44.9275 110.517L44.9815 110.067L45.1165 108.96L45.1345 108.816L45.1435 108.708C45.1615 108.618 45.1855 108.534 45.2155 108.456C45.2455 108.378 45.2905 108.291 45.3505 108.195C45.4165 108.099 45.4915 108.018 45.5755 107.952C45.6595 107.88 45.7705 107.82 45.9085 107.772C46.0465 107.724 46.2025 107.7 46.3765 107.7ZM46.3135 109.59L46.9075 109.833L46.8625 110.22L46.7545 111.156L46.7185 111.381L46.7095 111.48L46.6825 111.723L46.6555 111.921L46.6285 112.11H50.4625L49.8685 111.867L49.9135 111.48L50.0665 110.22L50.1475 109.59H46.3135ZM52.6894 107.736H53.5714H59.4754C59.6494 107.736 59.8024 107.76 59.9344 107.808C60.0664 107.85 60.1714 107.91 60.2494 107.988C60.3274 108.06 60.3904 108.141 60.4384 108.231C60.4924 108.321 60.5284 108.411 60.5464 108.501C60.5644 108.591 60.5764 108.672 60.5824 108.744C60.5884 108.816 60.5884 108.876 60.5824 108.924L60.5734 108.996L60.5104 109.509C60.5044 109.545 60.5014 109.584 60.5014 109.626L60.4744 109.869L60.3484 110.886L60.3124 111.129L60.1954 112.137L60.1144 112.767C60.1084 112.803 60.0994 112.851 60.0874 112.911C60.0754 112.965 60.0364 113.064 59.9704 113.208C59.9104 113.352 59.8324 113.481 59.7364 113.595C59.6464 113.703 59.5084 113.802 59.3224 113.892C59.1424 113.982 58.9354 114.027 58.7014 114.027H52.9504L53.5714 108.996L52.6894 107.736ZM54.7684 109.626L55.3624 109.86L55.3174 110.256L55.2004 111.183L55.1734 111.417L55.1644 111.516L55.1374 111.75L55.1104 111.948L55.0834 112.137H58.2874L58.3684 111.516L58.5214 110.256L58.5934 109.626H54.7684ZM61.1313 107.7H64.0653L64.0113 108.195L63.8403 109.59L63.8043 109.833L63.7593 110.211L63.6063 111.462L63.5523 111.912L63.4713 112.578L63.2913 114H61.3923L61.6353 111.993L62.0133 108.96L61.1313 107.7ZM66.9044 107.691H67.4444H71.2964C71.4644 107.691 71.6144 107.715 71.7464 107.763C71.8784 107.805 71.9834 107.862 72.0614 107.934C72.1394 108 72.2024 108.081 72.2504 108.177C72.3044 108.267 72.3404 108.351 72.3584 108.429C72.3824 108.507 72.3974 108.591 72.4034 108.681C72.4094 108.771 72.4094 108.831 72.4034 108.861C72.4034 108.891 72.4034 108.918 72.4034 108.942L72.3674 109.194L72.3314 109.464C72.3254 109.5 72.3224 109.536 72.3224 109.572V109.581L72.2954 109.824H72.2864H70.3874L70.4144 109.581H66.5894L67.1834 109.815L67.1384 110.202H70.9814C71.1554 110.202 71.3084 110.226 71.4404 110.274C71.5724 110.322 71.6774 110.385 71.7554 110.463C71.8334 110.535 71.8964 110.616 71.9444 110.706C71.9984 110.79 72.0344 110.877 72.0524 110.967C72.0704 111.057 72.0824 111.141 72.0884 111.219C72.0944 111.291 72.0974 111.351 72.0974 111.399L72.0884 111.462L72.0164 112.092L71.9714 112.407L71.9354 112.722C71.9294 112.758 71.9204 112.806 71.9084 112.866C71.8964 112.92 71.8574 113.019 71.7914 113.163C71.7314 113.307 71.6534 113.436 71.5574 113.55C71.4674 113.658 71.3294 113.757 71.1434 113.847C70.9634 113.937 70.7564 113.982 70.5224 113.982H66.0314C65.8634 113.982 65.7134 113.961 65.5814 113.919C65.4494 113.871 65.3444 113.814 65.2664 113.748C65.1884 113.682 65.1224 113.601 65.0684 113.505C65.0204 113.409 64.9844 113.322 64.9604 113.244C64.9424 113.166 64.9304 113.085 64.9244 113.001C64.9184 112.911 64.9154 112.851 64.9154 112.821C64.9214 112.791 64.9244 112.764 64.9244 112.74L65.0144 111.984L65.0324 111.84H66.9404L66.9314 111.903L66.9044 112.092H70.7384L70.1354 111.858L70.1894 111.462H66.3374C66.1694 111.462 66.0164 111.441 65.8784 111.399C65.7464 111.351 65.6414 111.291 65.5634 111.219C65.4914 111.141 65.4284 111.057 65.3744 110.967C65.3264 110.877 65.2934 110.79 65.2754 110.706C65.2574 110.616 65.2424 110.535 65.2304 110.463C65.2244 110.385 65.2244 110.322 65.2304 110.274L65.2394 110.211L65.2574 110.058L65.3564 109.203L65.3924 108.951L64.5104 107.691H66.6434H66.9044ZM79.0738 107.691H80.9728L80.7388 109.581C80.7388 109.581 80.7388 109.584 80.7388 109.59C80.7388 109.596 80.7388 109.602 80.7388 109.608L80.7118 109.851L80.5858 110.868L80.5498 111.111L80.5138 111.462L80.4778 111.705L80.4598 111.903L80.4328 112.092V112.119V112.128L80.4238 112.182L80.3518 112.758L80.3338 112.875L80.1988 114.018H78.2908L78.2998 113.982L78.3988 113.154L78.5248 112.128L78.6058 111.498V111.48H75.4018L75.3478 111.93L75.0868 114.018H73.1878L73.4308 112.002L73.8088 108.978L72.9268 107.718H75.8608L75.8068 108.213L75.6358 109.608L75.5998 109.851L75.5908 109.959L75.4738 110.004L74.9248 110.22H78.7588V110.202L78.7678 110.184V110.175V110.166L78.8038 109.851V109.842L78.8308 109.608L78.9118 108.951L78.9388 108.753L78.9658 108.51L79.0648 107.718L79.0738 107.691Z" fill="#DB1D1D" />
            <circle cx="50" cy="50" r="41" fill="#DB1D1D" />
            <path d="M50 73V88" stroke="white" stroke-width="6.6" stroke-linecap="square" />
            <path d="M98.1697 62.4397C98.3034 62.4742 98.4398 62.3938 98.4736 62.2599C100.387 54.6933 100.503 46.7826 98.811 39.1611C97.1005 31.4582 93.5913 24.2695 88.5702 18.1827C83.5491 12.0959 77.1587 7.28391 69.9215 4.14008C62.6844 0.996255 54.8059 -0.390115 46.9303 0.0943222C39.0546 0.57876 31.4054 2.92025 24.6081 6.92735C17.8108 10.9345 12.0584 16.4934 7.82111 23.1497C3.58384 29.8059 0.982078 37.3705 0.22853 45.225C-0.517055 52.9964 0.567675 60.8333 3.39433 68.1083C3.44434 68.237 3.58961 68.3001 3.71806 68.2495C3.8465 68.1989 3.90948 68.0536 3.85948 67.9249C1.06177 60.7233 -0.0118052 52.9657 0.726245 45.2727C1.47226 37.4968 4.04801 30.0079 8.2429 23.4182C12.4378 16.8285 18.1327 11.3251 24.8621 7.35808C31.5914 3.39105 39.1641 1.07297 46.961 0.593379C54.7578 0.113786 62.5575 1.48629 69.7223 4.59868C76.8871 7.71107 83.2136 12.475 88.1845 18.5009C93.1554 24.5268 96.6295 31.6436 98.3229 39.2695C99.9982 46.8139 99.8835 54.6447 97.9895 62.1349C97.9557 62.2688 98.036 62.4052 98.1697 62.4397Z" fill="#DB1D1D" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M45.7637 51.9761C44.383 51.9761 43.2637 50.8568 43.2637 49.4761L43.2637 26H43C41.3431 26 40 27.3431 40 29V62.1099C40 67.4153 44.3009 71.7162 49.6063 71.7162C54.9117 71.7162 59.2126 67.4153 59.2126 62.1099V29C59.2126 27.3431 57.8695 26 56.2126 26H55.9487V49.4761C55.9487 50.8568 54.8294 51.9761 53.4487 51.9761C52.068 51.9761 50.9487 50.8568 50.9487 49.4761V41.5H48.2637V49.4761C48.2637 50.8568 47.1444 51.9761 45.7637 51.9761ZM48.2637 36.5H50.9487V26H48.2637V36.5Z" fill="white" />
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
                    <h2>BANNER & PROMOTION</h2>
                    
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <Slidebar />

        <div class="content-body">
          <section class="bg-light-gray" />

          <div class="container-fluid">
            <div class="Notification_head">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <path
                    d="M24.0402 5.82019C17.4202 5.82019 12.0402 11.2002 12.0402 17.8202V23.6002C12.0402 24.8202 11.5202 26.6802 10.9002 27.7202L8.60018 31.5402C7.18018 33.9002 8.16018 36.5202 10.7602 37.4002C19.3802 40.2802 28.6802 40.2802 37.3002 37.4002C39.7202 36.6002 40.7802 33.7402 39.4602 31.5402L37.1602 27.7202C36.5602 26.6802 36.0402 24.8202 36.0402 23.6002V17.8202C36.0402 11.2202 30.6402 5.82019 24.0402 5.82019Z"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                  />
                  <path
                    d="M27.7394 6.4C27.1194 6.22 26.4794 6.08 25.8194 6C23.8994 5.76 22.0594 5.9 20.3394 6.4C20.9194 4.92 22.3594 3.88 24.0394 3.88C25.7194 3.88 27.1594 4.92 27.7394 6.4Z"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M30.0396 38.12C30.0396 41.42 27.3396 44.12 24.0396 44.12C22.3996 44.12 20.8795 43.44 19.7995 42.36C18.7195 41.28 18.0396 39.76 18.0396 38.12"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-miterlimit="10"
                  />
                </svg>
                <h3>Send Notification</h3>
              </div>
            </div>
            <div class="bannar_flex">
              <div class="banner_input">
                <input
                  type="text"
                  placeholder="Title"
                  class="form-control"
                  value={formik.values.title}
                  onChange={formik.handleChange("title")}
                  onBlur={formik.handleBlur("title")}
                />
                {formik.touched.title && formik.errors.title && (
                  <span className="validation">{formik.errors.title}</span>
                )}
                <br />
                <input
                  type="text"
                  placeholder="Body"
                  class="form-control"
                  value={formik.values.body}
                  onChange={formik.handleChange("body")}
                  onBlur={formik.handleBlur("body")}
                />
                {formik.touched.body && formik.errors.body && (
                  <span className="validation">{formik.errors.body}</span>
                )}
              </div>
              <div className="input-img">
                <button
                  className="input_btn"
                  style={{
                    backgroundImage: image && `url(${image})`,
                  }}
                >
                  <input
                    type="file"
                    placeholder="Image"
                    onChange={handleChange}
                  />
                </button>
                {formik.errors.image && (
                  <span className="validation">{formik.errors.image}</span>
                )}
              </div>

              <div class="bannar_flex1 gap-5 border-0">
                <p>
                  Select All{" "}
                  <input
                    type="radio"
                    checked={formik.values.status === "3"}
                    onClick={() => {
                      formik.setFieldValue("status", "3");
                    }}
                  />
                </p>
                <div>
                  <p>
                    User App{" "}
                    <input
                      type="radio"
                      checked={formik.values.status === "0"}
                      onClick={() => {
                        formik.setFieldValue("status", "0");
                      }}
                    />
                  </p>
                  <p>
                    Driver App{" "}
                    <input
                      type="radio"
                      checked={formik.values.status === "1"}
                      onClick={() => {
                        formik.setFieldValue("status", "1");
                      }}
                    />
                  </p>
                  <p>
                    Restaurent App{" "}
                    <input
                      type="radio"
                      checked={formik.values.status === "2"}
                      onClick={() => {
                        formik.setFieldValue("status", "2");
                      }}
                    />
                  </p>
                  {formik.touched.status && formik.errors.status && (
                    <span className="validation">{formik.errors.status}</span>
                  )}
                </div>
              </div>
              <button
                class="main_btn"
                onClick={formik.handleSubmit}
                type="submit"
              >
                Send
              </button>
            </div>

            <div class="row mini_card_border">
              {records?.map((item) => (
                <div class="col-lg-4 col-md-6">
                  <div class="bannar_flex border-0 mini_card">
                    <div>
                      <h6>{item.title}</h6>
                      <p>{item.body}</p>
                    </div>
                    <div class="mini_card_logo_back">
                      <div class=" rounded-5">
                        {item.image !== "" ? (
                          <img
                            src={`${baseurl}${item.image}`}
                            style={{ height: 40, width: 40 }}
                          />
                        ) : (
                          <img
                            src={`images/logooo.png`}
                            style={{ height: 40, width: 40 }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div class="row"></div>
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
          <div class="container-fluid">
            <div class="Notification_head mb-3">
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="38"
                  height="38"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <path
                    d="M16.9983 37.9996H15.9983C7.99829 37.9996 3.99829 35.9996 3.99829 25.9996V15.9996C3.99829 7.99957 7.99829 3.99957 15.9983 3.99957H31.9983C39.9983 3.99957 43.9983 7.99957 43.9983 15.9996V25.9996C43.9983 33.9996 39.9983 37.9996 31.9983 37.9996H30.9983C30.3783 37.9996 29.7783 38.2996 29.3983 38.7996L26.3983 42.7996C25.0783 44.5596 22.9183 44.5596 21.5983 42.7996L18.5983 38.7996C18.2783 38.3596 17.5383 37.9996 16.9983 37.9996Z"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M31.9915 22H32.0094"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M23.9917 22H24.0097"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M15.989 22H16.007"
                    stroke="#292D32"
                    stroke-width="3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h3>Send Text SMS</h3>
              </div>
              <button type="button" class="btn main_btn">
                Add Number
              </button>
            </div>
            <div class="bannar_flex">
              <div class="banner_input">
                <input
                  type="text"
                  placeholder="Enter Number"
                  class="form-control"
                />
                <br />
                <input
                  type="text"
                  placeholder="Enter Number"
                  class="form-control"
                />
              </div>
              <div class="">
                <button class="input_btn">
                  <input type="file" placeholder="Image" />
                </button>
              </div>
              <div class="banner_input">
                <textarea
                  name="text"
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="Enter message"
                ></textarea>
              </div>
              <button type="button" class="btn main_btn">
                Send
              </button>
            </div>
          </div>
          <div class="container-fluid ">
            <div class="row mini_card_border">
              <div class="col-lg-4 col-md-6">
                <div class="bannar_flex border-0 mini_card">
                  <div>
                    <h6>Your Friend Order for You</h6>
                    <h6>FROM THE HELLODISH</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <p>+91 8989898989,</p>
                      <p>+91 8989898989,</p>
                      <p>+244</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="bannar_flex border-0 mini_card">
                  <div>
                    <h6>Your Friend Order for You</h6>
                    <h6>FROM THE HELLODISH</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <p>+91 8989898989,</p>
                      <p>+91 8989898989,</p>
                      <p>+244</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="bannar_flex border-0 mini_card">
                  <div>
                    <h6>Cheers to 2024 as a new year</h6>
                    <h6>FROM THE HELLODISH</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <p>+91 8989898989,</p>
                      <p>+91 8989898989,</p>
                      <p>+244</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="bannar_flex border-0 mini_card ">
                  <div>
                    <h6>Cheers to 2024 as a new year</h6>
                    <h6>FROM THE HELLODISH</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <p>+91 8989898989,</p>
                      <p>+91 8989898989,</p>
                      <p>+244</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="bannar_flex border-0 mini_card  ">
                  <div>
                    <h6>Cheers to 2024 as a new year</h6>
                    <h6>FROM THE HELLODISH</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <p>+91 8989898989,</p>
                      <p>+91 8989898989,</p>
                      <p>+244</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-4 col-md-6">
                <div class="bannar_flex border-0 mini_card  ">
                  <div>
                    <h6>Cheers to 2024 as a new year</h6>
                    <h6>FROM THE HELLODISH</h6>
                    <div class="d-flex align-items-center gap-2 flex-wrap">
                      <p>+91 8989898989,</p>
                      <p>+91 8989898989,</p>
                      <p>+244</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12 custom-pagination">
                <ul>
                  <li>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_559_6979)">
                        <path
                          d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_6979">
                          <rect width="24" height="24" fill="white" />
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
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clip-path="url(#clip0_559_10108)">
                        <path
                          d="M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_559_10108">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <section />
        </div>
        {load && <Loader />}
      </div>
    </>
  );
};

export default BannersPromotions;
