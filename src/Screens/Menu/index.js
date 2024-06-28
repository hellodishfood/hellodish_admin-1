import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import NavHeader from "../NavHeader";
import { Link } from "react-router-dom";
import { baseurl } from "../../Utilities/Api";
import Loader from "../Loader";

function Menu() {
  useEffect(() => {
    GetMenu();
  }, []);

  const [menu, setMenu] = useState([]);
  const [title, setTitle] = useState("");
  const [addimg, setAddimg] = useState("");
  const [editimg, setEditimg] = useState("");
  const [isedit, setisEdit] = useState(false);
  const [openedcat, setOpenedCat] = useState([]);
  const [load, setLoad] = useState(false);

  const handleChange = (e, a) => {
    console.log(e);
    console.log(a);
    const file = e.target.files[0];
    if (a === "add") {
      setAddimg(file);
    } else {
      setEditimg(file);
      setisEdit(true);
      console.log(file);
    }
  };

  function GetMenu() {
    setLoad(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();

    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/getAllCategoryByAdmin`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        console.log(result.categories);
        if (result.status === true) {
          setMenu(result.categories);
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  function AddMenu(img) {
    setLoad(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: title,
      image: img,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/addCategory`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          setTitle("");
          GetMenu();
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }

  function EditMenu(img) {
    let img1 = "";
    if (img.includes("https")) {
      const [a, b] = img.split("/");
      img1 = b;
    } else {
      img1 = img;
    }
    setLoad(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: openedcat.name,
      active: openedcat.active,
      image: img1,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/updateCategory/${openedcat._id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          GetMenu();
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }
  function SEditMenu(name, active, id) {
    setLoad(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    const raw = JSON.stringify({
      name: name,
      active: active,
    });

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/updateCategory/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.status === true) {
          GetMenu();
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }
  const UploadImage = async (newFile, status) => {
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
        `${baseurl}driver/api/uploadImage`,
        requestOptions
      );
      const result = await response.json();
      setLoad(false);
      if (result.success === true) {
        if (status === "add") {
          AddMenu(result.data);
        } else {
          EditMenu(result.data);
        }
      } else {
        alert(result.message);
      }
    } catch (error) {
      setLoad(false);
      console.error("Error uploading image:", error);
    }
  };

  function Delete(id) {
    setLoad(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YzIxZjk3M2Q3YWQzYjQ4YzU4NTliZiIsImlhdCI6MTcwOTAyNTcyMn0.ggOrgVeJylB3Lx4eB1_YqES9l5d5F5tyu1uFaQpqvHI";
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`${baseurl}admin/api/deleteCategory/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setLoad(false);
        if (result.success) {
          GetMenu();
        }
      })
      .catch((error) => {
        setLoad(false);
        console.error(error);
      });
  }
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
                    <h3 className="font-w700">Menu</h3>
                  </div>
                </div>
                <ul className="navbar-nav header-right">
                  <li className="nav-item">
                    <a
                      className="btn main_btn"
                      data-bs-toggle="modal"
                      data-bs-target="#add-menu-box"
                    >
                      Add
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
              <div className="d-flex align-items-center gap-3">
                <h4 className="font-w600">{menu.length}</h4>
                <h4>FOOD CATEGORIES</h4>
              </div>
              <div className="col-xl-12">
                <div className="row menu-page">
                  {menu.map((item, ind) => (
                    <div className="col-xl-3 col-md-4 col-12">
                      <div className="card">
                        <div className="card-body d-flex align-items-center justify-content-between">
                          <div className="">
                            <small className="text-black">
                              {item.image !== "" ? (
                                <img src={`${baseurl}${item.image}`} alt="" />
                              ) : (
                                <img src="images/logooo.png" alt="" />
                              )}
                            </small>
                          </div>
                          <div className="menu">
                            <h5 className="font-w600 fs-16 d-block mb-2">
                              {item.name}
                            </h5>
                            <div className="d-flex align-items-center justify-content-between gap-3">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  checked={item.active === 1}
                                  onChange={() => {
                                    let a = item.active === 1 ? 0 : 1;
                                    SEditMenu(item.name, a, item._id);
                                  }}
                                />
                              </div>
                              <a
                                href=""
                                data-bs-toggle="modal"
                                onClick={() => {
                                  setEditimg(`${baseurl}${item.image}`);
                                  setisEdit(false);
                                  setOpenedCat(item);
                                }}
                                data-bs-target="#edit-menu-box"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={22}
                                  height={22}
                                  viewBox="0 0 22 22"
                                  fill="none"
                                >
                                  <path
                                    d="M12.1549 3.30012L4.62907 11.266C4.3449 11.5685 4.0699 12.1643 4.0149 12.5768L3.67574 15.5468C3.55657 16.6193 4.32657 17.3526 5.3899 17.1693L8.34157 16.6651C8.75407 16.5918 9.33157 16.2893 9.61574 15.9776L17.1416 8.01178C18.4432 6.63678 19.0299 5.06928 17.0041 3.15345C14.9874 1.25595 13.4566 1.92512 12.1549 3.30012V3.30012Z"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M10.8992 4.62939C11.0913 5.85851 11.6862 6.98902 12.5904 7.84345C13.4946 8.69789 14.657 9.22788 15.895 9.35023M2.75 20.1669H19.25"
                                    stroke="black"
                                    strokeWidth="1.5"
                                    strokeMiterlimit={10}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </a>
                              {/* <div
                                onClick={() => {
                                  Delete(item._id);
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={16}
                                  height={16}
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path
                                    d="M2 2L14.0208 14.0208"
                                    stroke="#EE7873"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M2.00067 14.0208L14.0215 2"
                                    stroke="#EE7873"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
      {/*  */}
      {/* Chart piety plugin files */}
      {/* Dashboard 1 */}
      {/*  */}
      {/* Modal */}
      <div
        class="modal fade"
        id="add-menu-box"
        tabindex="-1"
        aria-labelledby="add-menu-boxLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog model-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add-menu-boxLabel">
                <b>Add Menu</b>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row add-menu-page">
                <div class="col-lg-12 mx-auto">
                  <div class="card">
                    <div
                      className="col-lg-8 px-2"
                      // style={{ alignSelf: "center" }}
                    >
                      <div className="avatar-upload">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="addmenuimg"
                            accept=".png, .jpg, .jpeg"
                            // value={formik.values.baadhar}
                            onChange={(event) => {
                              handleChange(event, "add");
                            }}
                          />
                          <label htmlFor="addmenuimg">Add Image</label>
                        </div>
                        <div className="avatar-preview">
                          <div
                            id="imagePreview"
                            style={{
                              backgroundImage: addimg
                                ? `url(${URL.createObjectURL(addimg)})`
                                : `url("${addimg}")`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="titel" class="">
                        Title
                      </label>
                      <input
                        type="text"
                        name="titel"
                        id="titel"
                        class="form-control"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary mt-0 me-3"
                onClick={() => {
                  if (addimg !== "") {
                    UploadImage(addimg, "add");
                  } else {
                    AddMenu("uploads/1714492519923_logo.png");
                  }
                }}
                data-bs-dismiss="modal"
              >
                Add
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
      <div
        class="modal fade"
        id="edit-menu-box"
        tabindex="-1"
        aria-labelledby="add-menu-boxLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog model-sm modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="add-menu-boxLabel">
                <b>Edit Menu</b>
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="row add-menu-page">
                <div class="col-lg-12 mx-auto">
                  <div class="card">
                    <div
                      className="col-lg-8 px-2"
                      // style={{ alignSelf: "center" }}
                    >
                      <div className="avatar-upload">
                        <div className="avatar-edit">
                          <input
                            type="file"
                            id="editmenuimg"
                            accept=".png, .jpg, .jpeg"
                            onChange={(event) => {
                              handleChange(event, "edit");
                            }}
                          />
                          <label htmlFor="editmenuimg">Add Image</label>
                        </div>
                        <div className="avatar-preview">
                          <div
                            id="imagePreview"
                            style={{
                              backgroundImage: isedit
                                ? `url(${URL.createObjectURL(editimg)})`
                                : `url("${editimg}")`,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="titel" class="">
                        Title
                      </label>
                      <input
                        type="text"
                        name="titel"
                        id="titel"
                        class="form-control"
                        value={openedcat?.name}
                        onChange={(event) => {
                          const newName = event.target.value;
                          setOpenedCat((prevState) => ({
                            ...prevState,
                            name: newName,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => {
                  if (typeof editimg === "string") {
                    EditMenu(editimg);
                  } else {
                    UploadImage(editimg, "edit");
                  }
                }}
                data-bs-dismiss="modal"
              >
                Add
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Menu;
