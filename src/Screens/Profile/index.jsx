import React, { useEffect, useState } from "react";
import "./style.css";
import { baseurl } from "../../Utilities/Api";
import { useFormik } from "formik";
import Loader from "../Loader";

function Profile() {
  const [load, setLoad] = useState(false);
  const [image, setImage] = useState("");

  const formik = useFormik({
    initialValues: {
      user: "",
      email: "",
      oldpass: "",
      newpass: "",
    },
  });

  useEffect(() => {
    GetProfile();
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
        setImage(result?.user?.user?.profileImage);
        formik.setFieldValue("user", result.user.user.ownerName);
        formik.setFieldValue("email", result.user.user.email);
        formik.setFieldValue("oldpass", "");
        formik.setFieldValue("newpass", "");
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  function vali() {
    if (formik.values.oldpass === "" && formik.values.newpass !== "") {
      alert("Please Enter Old Password");
    } else if (formik.values.oldpass !== "" && formik.values.newpass === "") {
      alert("Please Enter New Password");
    } else {
      Update();
    }
  }

  function Update() {
    setLoad(true);
    let token = localStorage.getItem("authToken");
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      ownerName: formik.values.user,
      email: formik.values.email,
      profileImage: image,
      newPassword: formik.values.newpass,
      password: formik.values.oldpass,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/updateProfile`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          GetProfile();
        } else {
          alert(result.message);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    setLoad(true);
    try {
      const formdata = new FormData();
      formdata.append("image", file);

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      const response = await fetch(
        `${baseurl}driver/api/uploadImage`,
        requestOptions
      );
      const result = await response.json();
      setLoad(false);
      if (result.success === true) {
        let img = `${baseurl}${result.data}`;
        setImage(img);
      } else {
        alert(result.message);
      }
    } catch (error) {
      setLoad(false);
      console.error("Error uploading image:", error);
    }
  }

  return (
    <div className="container profile-page">
      <h1 className="edit-profile-header">Edit Profile</h1>
      <div className="row">
        <div className="col-md-5 text-center">
          <img
            src={image || "images/user.png"}
            className="avatar"
            alt="avatar"
          />
          <h6 style={{marginTop:"20px",marginLeft:"-90px"}}>No choosen File</h6>
          <input
            type="file"
            className="form-control for-profile-up"
            onChange={handleImageChange}
          />
        </div>
        <div className="col-md-7 personal-info">
          <form className="form-horizontal" role="form">
            <div className="form-group">
              <label className="control-label">User Name</label>
              <div>
                <input
                  className="form-control input-custom"
                  type="text"
                  placeholder="Enter Here"
                  value={formik.values.user}
                  onChange={formik.handleChange("user")}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Email</label>
              <div>
                <input
                  className="form-control input-custom"
                  type="text"
                  placeholder="Enter Here"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">Old Password</label>
              <div>
                <input
                  className="form-control input-custom"
                  type="password"
                  placeholder="Enter Here"
                  value={formik.values.oldpass}
                  onChange={formik.handleChange("oldpass")}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label">New Password</label>
              <div>
                <input
                  className="form-control input-custom"
                  type="password"
                  placeholder="Enter Here"
                  value={formik.values.newpass}
                  onChange={formik.handleChange("newpass")}
                />
              </div>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn save-button"
                onClick={vali}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {load && <Loader />}
    </div>
  );
}

export default Profile;
