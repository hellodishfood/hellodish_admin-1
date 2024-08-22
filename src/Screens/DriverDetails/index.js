import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Slidebar from "../Slidebar";
import { useFormik } from "formik";
import { baseurl } from "../../Utilities/Api";
import { useHelloDishApp } from "../../contexts/HelloDishAppProvider";
import Loader from "../Loader";
import axios from "axios";

const imageInterface = {
  adharCardFront: null,
  adharCardBack: null,
  pandCard: null,
  drivingLicenseFront: null,
  drivingLicenseBack: null,
  selfie: null,
};
function DriverDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { UpdateData, UpdateFormData } = useHelloDishApp();
  const [load, setLoad] = useState(false);
  const [img, setImg] = useState();
  const [imageUploadFile, setImageUploadFile] = useState(imageInterface);
  const [modalImage, setModalImage] = useState("");
  const [image, setImage] = useState(imageInterface);
  const data = location?.state?.data;
  console.log(data, "data-+-+-+-+-+-+-+-+");
  const documentData = data?.documentDetails;

  console.log(documentData, "documentData");
  const baseUrl = "https://api.hellodish.in/";
  const [showModal, setShowModal] = useState(false);

  const handleShow = (image) => {
    setShowModal(true);
    setModalImage(image);
  };
  const handleClose = () => setShowModal(false);
  useEffect(() => {
    setImage({
      adharCardFront:
        documentData?.adharCardFront !== "" ? documentData?.adharCardFront : "",
      adharCardBack:
        documentData?.adharCardBack !== "" ? documentData?.adharCardBack : "",
      pandCard: documentData?.pandCard !== "" ? documentData?.pandCard : "",
      drivingLicenseFront:
        documentData?.drivingLicenseFront !== ""
          ? documentData?.drivingLicenseFront
          : "",
      drivingLicenseBack:
        documentData?.drivingLicenseBack !== ""
          ? documentData?.drivingLicenseBack
          : "",
      selfie: documentData?.selfie !== "" ? documentData?.selfie : "",
    });
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    return `${year}-${month}-${day}`;
  }
  // const handleAadharBackChange = (e) => {
  //   // Handle image upload logic here
  //   const file = e.target.files[0];
  //   // Example logic to set image state
  //   setImage(URL.createObjectURL(file));
  // };

  const IMAGE_URL =
    "https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png";
  const toDataURL = async (url) => {
    /* Using Fetch */
    // const response = await fetch(url)
    // const blobData = await response.blob()
    // const imageDataUrl = URL.createObjectURL(blobData);

    /* Using Axios */
    const response = await axios.get(url, { responseType: "blob" });
    const imageDataUrl = URL.createObjectURL(response.data);

    return imageDataUrl;
  };

  const handleDownload = async (dataimage) => {
    const a = document.createElement("a");
    console.log(image, "image");
    a.href = await toDataURL(`https://api.hellodish.in/${dataimage}`);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formik = useFormik({
    initialValues: {
      name: data?.driver?.name,
      email: data?.driver?.email,
      number: data?.driver?.phone,
      vehicle: data?.driver?.vehicleType,
      online: data?.driver?.onlineOffline,
      dob: formatDate(data?.driver?.dateOfBirth),
      gender: data?.driver?.gender,
      bankpersonname: data?.bankDetails?.bankHolderName,
      bankname: data?.bankDetails?.bankName,
      accno: data?.bankDetails?.bankAccountNumber,
      ifsc: data?.bankDetails?.ifscCode,
      faadhar: `${data?.documentDetails?.adharCardFront}`,
      baadhar: `${data?.documentDetails?.adharCardBack}`,
      fdrive: `${data?.documentDetails?.drivingLicenseFront}`,
      bdrive: `${data?.documentDetails?.drivingLicenseBack}`,
      pan: `${data?.documentDetails?.pandCard}`,
      selfie: `${data?.documentDetails?.selfie}`,
      multi: data?.driver?.multipleOrder,
    },
    // validationSchema: loginValidationSchema,
    onSubmit: () => {
      // Login();
    },
  });

  const handleAadharFrontChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await UploadImage(file);
    setImage((prevState) => ({
      ...prevState,
      adharCardFront: imageUrl,
    }));
  };
  const handleAadharBackChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await UploadImage(file);
    setImage((prevState) => ({
      ...prevState,
      adharCardBack: imageUrl,
    }));
  };
  const handleDrivingLicenseFrontChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await UploadImage(file);
    setImage((prevState) => ({
      ...prevState,
      drivingLicenseFront: imageUrl,
    }));
  };
  const handleDrivingLicenseBackChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await UploadImage(file);
    setImage((prevState) => ({
      ...prevState,
      drivingLicenseBack: imageUrl,
    }));
  };
  const handlePancardChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await UploadImage(file);
    setImage((prevState) => ({
      ...prevState,
      pandCard: imageUrl,
    }));
  };
  const handleSelfieChange = async (e) => {
    const file = e.target.files[0];
    const imageUrl = await UploadImage(file);
    if (imageUrl) {
      setImage((prevState) => ({
        ...prevState,
        selfie: imageUrl,
      }));
    }
  };

  const updatedetails = async () => {
    setLoad(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTQ2ZjU0NGJmOWRkZDU0NDQ5NWRlMCIsImlhdCI6MTcwOTQ2OTU1N30.6kqtJXhoWRlCCb3WtIDC-OtMB-PeXPgkhOCGS5OMw0A"
    );

    const raw = JSON.stringify({
      name: formik.values.name,
      gender: formik.values.gender,
      dateOfBirth: formik.values.dob,
      onlineOffline: formik.values.online,
      multipleOrder: formik.values.multi,
      vehicleType: formik.values.vehicle,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}admin/api/update/${data.driver._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success === true) {
          updatebank();
        } else {
          setLoad(false);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  };

  const updatebank = async () => {
    const requestBody = {
      bankName: formik.values.bankname,
      bankHolderName: formik.values.bankpersonname,
      bankAccountNumber: formik.values.accno,
      ifscCode: formik.values.ifsc,
    };

    const result = await UpdateData(
      `admin/api/updateBank/${data?.bankDetails?._id}`,
      requestBody
    );

    if (result.isOk) {
      Updatedoc();
    } else {
      setLoad(false);
    }
  };

  const Updatedoc = async () => {
    const requestBody = {
      adharCardFront: image?.adharCardFront,
      adharCardBack: image?.adharCardBack,
      pandCard: image?.pandCard,
      drivingLicenseFront: image?.drivingLicenseFront,
      drivingLicenseBack: image?.drivingLicenseBack,
      selfie: image?.selfie,
    };

    const result = await UpdateData(
      `admin/api/updateDocument/${data?.documentDetails?._id}`,
      requestBody
    );

    if (result.isOk) {
      setLoad(false);
      navigate("/Driver");
    } else {
      setLoad(false);
    }
  };

  const UploadImage = async (newFile) => {
    setLoad(true);
    try {
      const formdata = new FormData();
      formdata.append("image", newFile);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseUrl}driver/api/uploadImage`,
        requestOptions
      );
      const result = await response.json();
      setLoad(false);
      return result.data;
    } catch (error) {
      setLoad(false);
      console.error("Error uploading image:", error);
    }
  };

  console.log(image, "image");

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
        <div className="nav-header">
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
              ></path>
              <circle cx="50" cy="50" r="41" fill="#DB1D1D"></circle>
              <path
                d="M50 73V88"
                stroke="white"
                stroke-width="6.6"
                stroke-linecap="square"
              ></path>
              <path
                d="M98.1697 62.4397C98.3034 62.4742 98.4398 62.3938 98.4736 62.2599C100.387 54.6933 100.503 46.7826 98.811 39.1611C97.1005 31.4582 93.5913 24.2695 88.5702 18.1827C83.5491 12.0959 77.1587 7.28391 69.9215 4.14008C62.6844 0.996255 54.8059 -0.390115 46.9303 0.0943222C39.0546 0.57876 31.4054 2.92025 24.6081 6.92735C17.8108 10.9345 12.0584 16.4934 7.82111 23.1497C3.58384 29.8059 0.982078 37.3705 0.22853 45.225C-0.517055 52.9964 0.567675 60.8333 3.39433 68.1083C3.44434 68.237 3.58961 68.3001 3.71806 68.2495C3.8465 68.1989 3.90948 68.0536 3.85948 67.9249C1.06177 60.7233 -0.0118052 52.9657 0.726245 45.2727C1.47226 37.4968 4.04801 30.0079 8.2429 23.4182C12.4378 16.8285 18.1327 11.3251 24.8621 7.35808C31.5914 3.39105 39.1641 1.07297 46.961 0.593379C54.7578 0.113786 62.5575 1.48629 69.7223 4.59868C76.8871 7.71107 83.2136 12.475 88.1845 18.5009C93.1554 24.5268 96.6295 31.6436 98.3229 39.2695C99.9982 46.8139 99.8835 54.6447 97.9895 62.1349C97.9557 62.2688 98.036 62.4052 98.1697 62.4397Z"
                fill="#DB1D1D"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M45.7637 51.9761C44.383 51.9761 43.2637 50.8568 43.2637 49.4761L43.2637 26H43C41.3431 26 40 27.3431 40 29V62.1099C40 67.4153 44.3009 71.7162 49.6063 71.7162C54.9117 71.7162 59.2126 67.4153 59.2126 62.1099V29C59.2126 27.3431 57.8695 26 56.2126 26H55.9487V49.4761C55.9487 50.8568 54.8294 51.9761 53.4487 51.9761C52.068 51.9761 50.9487 50.8568 50.9487 49.4761V41.5H48.2637V49.4761C48.2637 50.8568 47.1444 51.9761 45.7637 51.9761ZM48.2637 36.5H50.9487V26H48.2637V36.5Z"
                fill="white"
              ></path>
            </svg>
          </Link>
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
                    <div className="d-flex align-items-center gap-3">
                      {data?.driver?.profileImage !== "" ? (
                        <img
                          src={`${baseUrl}${data?.driver?.profileImage}`}
                          style={{ width: 60, height: 60, borderRadius: 13 }}
                        />
                      ) : (
                        <img
                          src="images/user.png"
                          style={{ width: 60, height: 60, borderRadius: 13 }}
                        />
                      )}
                      <h2 className="mb-0 me-auto">{data?.driver?.name}</h2>
                      <span>
                        <small>
                          {data?.driver?.rating} ({data?.driver?.driverReview})
                        </small>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-5">
                  <ul className="navbar-nav header-right AVAILABLE">
                    <div className="d-flex align-items-center gap-2">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block  badge bg-success">
                          Multiple order Accept
                        </span>
                      </div>
                      <div className="form-check form-switch pt-10px">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          checked={formik.values.multi === 1}
                          onChange={() => {
                            let st = formik.values.multi === 1 ? 0 : 1;
                            formik.setFieldValue("multi", st);
                          }}
                        />
                      </div>
                    </div>
                  </ul>
                  <ul className="navbar-nav header-right AVAILABLE">
                    <div className="d-flex align-items-center gap-2">
                      <div className="menu">
                        <span className="font-w500 fs-16 d-block  badge bg-success">
                          AVAILABLE FOR WORK
                        </span>
                      </div>
                      <div className="form-check form-switch pt-10px">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckChecked"
                          checked={formik.values.online === 1}
                          onChange={() => {
                            let st = formik.values.online === 1 ? 0 : 1;
                            formik.setFieldValue("online", st);
                          }}
                        />
                      </div>
                    </div>
                  </ul>
                  <button
                            type="button"
                            className="btn main_btn w-100 mt-2"
                            onClick={() => {
                              // updatebank();
                              updatedetails();
                              // Updatedoc();
                            }}
                            style={{ height: 38, borderRadius: 45 }}
                          >
                            Save
                          </button>
                </div>
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
          <div className="restoo container-fluid">
            <div className="row">
              <div className="col-lg-4 col-md-6 px-5">
                <div className="resto-left">
                  <h4>Drivers Details</h4>
                </div>
                <div className="resto-input">
                  <label htmlFor="email">Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ayush manupara"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                  />
                </div>
                <div className="resto-input">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="ayush@gmail.com"
                    value={formik.values.email}
                    disabled={true}
                  />
                </div>
                <div className="resto-input">
                  <label htmlFor="email">Mobile Number</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="+91 7878787878"
                    value={formik.values.number}
                    disabled={true}
                  />
                </div>
                <div className="resto-input">
                  <label htmlFor="email">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formik.values.dob}
                    onChange={formik.handleChange("dob")}
                  />
                </div>
                <div className="for-gender">
                  <form className="form flex-center ">
                    <div className="form-row flex-center">
                      <input
                        type="radio"
                        name="gender"
                        id="Male"
                        className="form-input"
                        checked={formik.values.gender === "Male"}
                        onChange={() => {
                          formik.setFieldValue("gender", "Male");
                        }}
                      />
                      <label htmlFor="Male" className="form-label">
                        Male
                      </label>
                    </div>
                    <div className="form-row flex-center">
                      <input
                        type="radio"
                        name="gender"
                        id="Female"
                        className="form-input"
                        checked={formik.values.gender === "Female"}
                        onChange={() => {
                          formik.setFieldValue("gender", "Female");
                        }}
                      />
                      <label htmlFor="Female" className="form-label">
                        Female
                      </label>
                    </div>
                    <div className="form-row flex-center">
                      <input
                        type="radio"
                        name="gender"
                        id="other"
                        className="form-input"
                        checked={formik.values.gender === "Other"}
                        onChange={() => {
                          formik.setFieldValue("gender", "Other");
                        }}
                      />
                      <label htmlFor="other" className="form-label">
                        Other
                      </label>
                    </div>
                  </form>
                </div>
                <div className="for-bike-select">
                  <div className="resto-left">
                    <h4>Vehical Type</h4>
                  </div>
                  <form className="form flex-center ">
                    <div>
                      <div className="form-row flex-center">
                        <input
                          type="radio"
                          name="gender"
                          id="electricscooter"
                          className="form-input"
                          checked={formik.values.vehicle === 0}
                          onChange={() => {
                            formik.setFieldValue("vehicle", 0);
                          }}
                        />
                        <label htmlFor="electricscooter" className="form-label">
                          <img
                            src="images/avatar/Electric Scooter.svg"
                            alt=""
                          />
                        </label>
                      </div>
                      <p className="text-center">Electric Scooter</p>
                    </div>
                    <div>
                      <div className="form-row flex-center">
                        <input
                          type="radio"
                          name="gender"
                          id="Motorcycle"
                          className="form-input"
                          checked={formik.values.vehicle === 1}
                          onChange={() => {
                            formik.setFieldValue("vehicle", 1);
                          }}
                        />
                        <label htmlFor="Motorcycle" className="form-label">
                          <img src="images/avatar/Motorcycle.svg" alt="" />
                        </label>
                      </div>
                      <p className="text-center">Motorcycle</p>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-8 col-md-6 for-img-up px-5">
                <div className="row">
                  <div className="resto-left mb-4">
                    <h4>Documents Details</h4>
                  </div>

                  <div className="col-lg-6 col-md-6">
                    <div className="row ">
                      <div className="col-12">
                        <h5>ADHAR CARD</h5>
                      </div>
                      <div className="col-lg-6 px-2">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <div className="App">
                              {/* <button
  className="btn btn-primary"style={{ fontSize: '12px',marginLeft:"-59px",marginTop:"-20px"}}
  onClick={() => handleShow(image?.adharCardFront)}
>
    <i className="fas fa-eye" style={{ fontSize: '12px',height:"2px"}}></i>
</button> */}
                              <div
                                style={{
                                  position: "relative",
                                  display: "inline-block",
                                }}
                              >
                                {/* <img src={image?.adharCardFront} style={{ display: 'block' }} /> */}
                                <button
                                  className="btn btn-primary"
                                  style={{
                                    fontSize: "12px",
                                    position: "absolute",
                                    top: "-55px", // Adjust the position as needed
                                    left: "10px", // Adjust the position as needed
                                    marginLeft: "-64px", // Remove margin if not needed
                                  }}
                                  onClick={() =>
                                    handleShow(image?.adharCardFront)
                                  }
                                >
                                  <i
                                    className="fas fa-eye"
                                    style={{ fontSize: "12px", height: "2px" }}
                                  ></i>
                                </button>
                              </div>

                              {showModal && (
                                <div
                                  className="modal show d-block"
                                  tabIndex="-1"
                                >
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={handleClose}
                                        ></button>
                                      </div>
                                      <div className="modal-body p-0">
                                        <div
                                          style={{
                                            maxHeight: "500px",
                                            maxWidth: "500px",
                                            overflow: "auto",
                                          }}
                                        >
                                          <img
                                            src={`https://api.hellodish.in/${modalImage}`}
                                            alt="img not found"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <input
                              type="file"
                              id="imageUploadAadharFront"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleAadharFrontChange}
                            />
                            <label htmlFor="imageUploadAadharFront">
                              Front
                            </label>
                          </div>

                          {/* <div className="avatar-preview">
                          {image?.adharCardFront && (
                              <button
                              style={{ fontSize: '12px',marginLeft:"110px",marginTop:"100px"}}
                                onClick={() =>
                                  handleDownload(image?.adharCardFront)
                                }
                                className="btn btn-primary mt-2"
                              >
                                <i className="fas fa-download" style={{ fontSize: '12px' }}></i> 
                              </button>
                            )}
                            <div
                              id="imagePreview"
                              
                              style={{
                                backgroundImage: `url("${baseUrl}${image?.adharCardFront}")`,
                                // backgroundImage: imageUploadFile?.adharCardFront
                                //   ? `url(${URL.createObjectURL(
                                //       imageUploadFile?.adharCardFront
                                //     )})`
                                //   : // : 'url("images/avatar/aad-f.svg")'
                                //     `url("${image?.adharCardFront}")`,
                              }}
                              
                            ></div>
                            
                          </div> */}
                          <div
                            className="avatar-preview"
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {image?.adharCardFront && (
                              <button
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "7px", // Adjust as needed
                                  left: "95px", // Adjust as needed
                                }}
                                onClick={() =>
                                  handleDownload(image?.adharCardFront)
                                }
                                className="btn btn-primary mt-2"
                              >
                                <i
                                  className="fas fa-download"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>
                            )}
                            <div
                              id="imagePreview"
                              style={{
                                width: "100%", // Adjust as needed
                                height: "100%", // Adjust as needed
                                backgroundImage: `url("${baseUrl}${image?.adharCardFront}")`,
                                backgroundSize: "cover", // Adjust as needed
                                backgroundPosition: "center", // Adjust as needed
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="col-lg-6 px-2">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <input
                              type="file"
                              id="imageUploadAadharBack"
                              accept=".png, .jpg, .jpeg"
                              // value={formik.values.baadhar}
                              onChange={handleAadharBackChange}
                            />
                            <label htmlFor="imageUploadAadharBack">Back</label>
                          </div>
                          <div className="avatar-preview">
                            <div
                              id="imagePreview"
                              style={{
                                backgroundImage: `url("${baseUrl}${image?.adharCardBack}")`,
                                // backgroundImage: imageUploadFile?.adharCardBack
                                //   ? `url(${URL.createObjectURL(
                                //       imageUploadFile?.adharCardBack
                                //     )})`
                                //   : // : 'url("images/avatar/aad-f.svg")'
                                //     `url("${image?.adharCardBack}")`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div> */}
                      <div className="col-lg-6 px-2">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <div className="App">
                              <button
                                style={{
                                  fontSize: "12px",
                                  marginLeft: "-59px",
                                  marginTop: "-20px",
                                }}
                                className="btn btn-primary"
                                onClick={() => handleShow(image?.adharCardBack)}
                              >
                                <i
                                  className="fas fa-eye"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>

                              {showModal && (
                                <div
                                  className="modal show d-block"
                                  tabIndex="-1"
                                >
                                  <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                      <div className="modal-header">
                                        <button
                                          type="button"
                                          className="btn-close"
                                          onClick={handleClose}
                                        ></button>
                                      </div>
                                      <div className="modal-body p-0">
                                        <div
                                          style={{
                                            maxHeight: "500px",
                                            maxWidth: "500px",
                                            overflow: "auto",
                                          }}
                                        >
                                          <img
                                            src={`https://api.hellodish.in/${modalImage}`}
                                            alt="img not found"
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover",
                                            }}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <input
                              type="file"
                              id="imageUploadAadharBack"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleAadharBackChange}
                            />

                            <label htmlFor="imageUploadAadharBack">Back</label>
                          </div>

                          <div
                            className="avatar-preview"
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {image?.adharCardBack && (
                              <button
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "7px", // Adjust as needed
                                  left: "95px", // Adjust as needed
                                }}
                                onClick={() =>
                                  handleDownload(image?.adharCardBack)
                                }
                                className="btn btn-primary mt-2"
                              >
                                <i
                                  className="fas fa-download"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>
                            )}
                            <div
                              id="imagePreview"
                              style={{
                                width: "100%", // Adjust as needed
                                height: "100%", // Adjust as needed
                                backgroundImage: `url("${baseUrl}${image?.adharCardBack}")`,
                                backgroundSize: "cover", // Adjust as needed
                                backgroundPosition: "center", // Adjust as needed
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12 mt-3">
                        <h5>PAN CARD</h5>
                      </div>
                      <div className="col-lg-6 px-2 mt-1">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <div
                              style={{
                                position: "relative",
                                display: "inline-block",
                              }}
                            >
                              {/* <img src={image?.adharCardFront} alt="Adhar Card Front" style={{ display: 'block' }} /> */}
                              <button
                                className="btn btn-primary"
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "10px", // Adjust the position as needed
                                  left: "10px", // Adjust the position as needed
                                  margin: "-46px", // Remove margin if not needed
                                  marginLeft: "-67px",
                                }}
                                onClick={() => handleShow(image?.pandCard)}
                              >
                                <i
                                  className="fas fa-eye"
                                  style={{ fontSize: "12px", height: "2px" }}
                                ></i>
                              </button>
                            </div>

                            {showModal && (
                              <div className="modal show d-block" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                      ></button>
                                    </div>
                                    <div className="modal-body p-0">
                                      <div
                                        style={{
                                          maxHeight: "500px",
                                          maxWidth: "500px",
                                          overflow: "auto",
                                        }}
                                      >
                                        <img
                                          src={`https://api.hellodish.in/${modalImage}`}
                                          alt="img not found"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <input
                              type="file"
                              id="imageUploadPancard"
                              accept=".png, .jpg, .jpeg"
                              // value={formik.values.pan}
                              onChange={handlePancardChange}
                            />
                            <label htmlFor="imageUploadPancard">Front</label>
                          </div>

                          <div
                            className="avatar-preview"
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {image?.pandCard && (
                              <button
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "5px", // Adjust as needed
                                  left: "101px", // Adjust as needed
                                }}
                                onClick={() => handleDownload(image?.pandCard)}
                                className="btn btn-primary mt-2"
                              >
                                <i
                                  className="fas fa-download"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>
                            )}
                            <div
                              id="imagePreview"
                              style={{
                                width: "100%", // Adjust as needed
                                height: "100%", // Adjust as needed
                                backgroundImage: `url("${baseUrl}${image?.pandCard}")`,
                                backgroundSize: "cover", // Adjust as needed
                                backgroundPosition: "center", // Adjust as needed
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6">
                    <div className="row ">
                      <div className="col-12">
                        <h5>DRIVING LICENSE</h5>
                      </div>
                      <div className="col-lg-6 px-2">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <button
                              style={{
                                fontSize: "12px",
                                marginLeft: "-59px",
                                marginTop: "-20px",
                              }}
                              className="btn btn-primary"
                              onClick={() =>
                                handleShow(image?.drivingLicenseFront)
                              }
                            >
                              <i
                                className="fas fa-eye"
                                style={{ fontSize: "12px" }}
                              ></i>
                            </button>

                            {showModal && (
                              <div className="modal show d-block" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                      ></button>
                                    </div>
                                    <div className="modal-body p-0">
                                      <div
                                        style={{
                                          maxHeight: "500px",
                                          maxWidth: "500px",
                                          overflow: "auto",
                                        }}
                                      >
                                        <img
                                          src={`https://api.hellodish.in/${modalImage}`}
                                          alt="img not found"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <input
                              type="file"
                              id="imageUploadDrivingLicenseFront"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleDrivingLicenseFrontChange}
                              // value={formik.values.fdrive}
                            />
                            <label htmlFor="imageUploadDrivingLicenseFront">
                              Front
                            </label>
                          </div>
                          <div
                            className="avatar-preview"
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {image?.drivingLicenseFront && (
                              <button
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "5px", // Adjust as needed
                                  left: "101px", // Adjust as needed
                                }}
                                onClick={() =>
                                  handleDownload(image?.drivingLicenseFront)
                                }
                                className="btn btn-primary mt-2"
                              >
                                <i
                                  className="fas fa-download"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>
                            )}
                            <div
                              id="imagePreview"
                              style={{
                                width: "100%", // Adjust as needed
                                height: "100%", // Adjust as needed
                                backgroundImage: `url("${baseUrl}${image?.drivingLicenseFront}")`,
                                backgroundSize: "cover", // Adjust as needed
                                backgroundPosition: "center", // Adjust as needed
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 px-2">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <button
                              className="btn btn-primary"
                              style={{
                                fontSize: "12px",
                                marginLeft: "-59px",
                                marginTop: "-20px",
                              }}
                              onClick={() =>
                                handleShow(image?.drivingLicenseBack)
                              }
                            >
                              <i
                                className="fas fa-eye"
                                style={{ fontSize: "12px", height: "2px" }}
                              ></i>
                            </button>

                            {showModal && (
                              <div className="modal show d-block" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                      ></button>
                                    </div>
                                    <div className="modal-body p-0">
                                      <div
                                        style={{
                                          maxHeight: "500px",
                                          maxWidth: "500px",
                                          overflow: "auto",
                                        }}
                                      >
                                        <img
                                          src={`https://api.hellodish.in/${modalImage}`}
                                          alt="img not found"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <input
                              type="file"
                              id="imageUploadDrivingLicenseBack"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleDrivingLicenseBackChange}
                              // value={formik.values.bdrive}
                            />
                            <label htmlFor="imageUploadDrivingLicenseBack">
                              Back
                            </label>
                          </div>
                          <div
                            className="avatar-preview"
                            style={{
                              position: "relative",
                              display: "inline-block",
                            }}
                          >
                            {image?.drivingLicenseBack && (
                              <button
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "5px", // Adjust as needed
                                  left: "101px", // Adjust as needed
                                }}
                                onClick={() =>
                                  handleDownload(image?.drivingLicenseBack)
                                }
                                className="btn btn-primary mt-2"
                              >
                                <i
                                  className="fas fa-download"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>
                            )}
                            <div
                              id="imagePreview"
                              style={{
                                width: "100%", // Adjust as needed
                                height: "100%", // Adjust as needed
                                backgroundImage: `url("${baseUrl}${image?.drivingLicenseBack}")`,
                                backgroundSize: "cover", // Adjust as needed
                                backgroundPosition: "center", // Adjust as needed
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="col-12 px-2 mt-3">
                        <h5>IDENTITY PROOF (SELFIE)</h5>
                      </div>
                      <div className="col-lg-6  mt-1">
                        <div className="avatar-upload">
                          <div className="avatar-edit">
                            <button
                              className="btn btn-primary"
                              style={{
                                fontSize: "12px",
                                marginLeft: "-59px",
                                marginTop: "-20px",
                              }}
                              onClick={() => handleShow(image?.selfie)}
                            >
                              <i
                                className="fas fa-eye"
                                style={{ fontSize: "12px", height: "2px" }}
                              ></i>
                            </button>

                            {showModal && (
                              <div className="modal show d-block" tabIndex="-1">
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <button
                                        type="button"
                                        className="btn-close"
                                        onClick={handleClose}
                                      ></button>
                                    </div>
                                    <div className="modal-body p-0">
                                      <div
                                        style={{
                                          maxHeight: "500px",
                                          maxWidth: "500px",
                                          overflow: "auto",
                                        }}
                                      >
                                        <img
                                          src={`https://api.hellodish.in/${modalImage}`}
                                          alt="img not found"
                                          style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <input
                              type="file"
                              id="imageUploadSelfie"
                              accept=".png, .jpg, .jpeg"
                              onChange={handleSelfieChange}
                            />
                            <label htmlFor="imageUploadSelfie">SELFIE</label>
                          </div>

                          <div className="avatar-preview">
                            <div
                              id="imagePreview"
                              style={{
                                backgroundImage: `url("${baseUrl}${image?.selfie}")`,
                              }}
                            ></div>
                          </div>
                          {image?.selfie && (
                              <button
                                style={{
                                  fontSize: "12px",
                                  position: "absolute",
                                  top: "7px", // Adjust as needed
                                  left: "95px", // Adjust as needed
                                }}
                                onClick={() =>
                                  handleDownload(image?.selfie)
                                }
                                className="btn btn-primary mt-2"
                              >
                                <i
                                  className="fas fa-download"
                                  style={{ fontSize: "12px" }}
                                ></i>
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 mt-5 pt-5">
                    <h2 className="h2">Bank Details</h2>
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="resto-input">
                          <label htmlFor="email">
                            Name as par bank account
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Ayush manupara"
                            value={formik.values.bankpersonname}
                            onChange={formik.handleChange("bankpersonname")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="resto-input">
                          <label htmlFor="email">Bank name</label>
                          <select type="text" className="form-control">
                            <option value="" selected={formik.values.bankname}>
                              {formik.values.bankname}
                            </option>
                            <option
                              value=""
                              onClick={() => {
                                formik.setFieldValue(
                                  "bankname",
                                  "Bank of India"
                                );
                              }}
                            >
                              Bank of India
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="resto-input">
                          <label htmlFor="email">Account number</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder={98765432101}
                            value={formik.values.accno}
                            onChange={formik.handleChange("accno")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="resto-input">
                          <label htmlFor="email">IFSC code</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="SBIN0013109"
                            value={formik.values.ifsc}
                            onChange={formik.handleChange("ifsc")}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 mt-5">
                        <div className="mid-done-btn">
                          {/* <button
                            type="button"
                            className="btn main_btn w-100 mt-2"
                            onClick={() => {
                              // updatebank();
                              updatedetails();
                              // Updatedoc();
                            }}
                            style={{ height: 60, borderRadius: 50 }}
                          >
                            Save
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
    </>
  );
}

export default DriverDetails;