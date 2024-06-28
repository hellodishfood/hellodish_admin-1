import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useFormik } from "formik";
import { loginRequest } from "./actions";
import { useAuth } from "../../contexts/auth";
import * as yup from "yup";
import "./style.css";

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email is invalid")
    .required("Email is required")
    .trim("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters")
    .trim("Password is required"),
});

export default function Login() {
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleDisableBackButton = () => {
      window.history.forward();
    };

    window.addEventListener("popstate", handleDisableBackButton);

    return () => {
      window.removeEventListener("popstate", handleDisableBackButton);
    };
  }, []);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: () => {
      handleLogin();
    },
  });

  const handleLogin = async () => {
    const { email, password } = formik.values;
    setLoading(true);

    const result = await signIn(email, password);

    if (!result.isOk) {
      setLoading(false);
      alert("Incorrect Username or password");
    } else {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="login-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="login-card">
                <div className="login-left">
                  <form>
                    <div class="login-head">
                      <h6>Delete Project</h6>
                    </div>
                    <div class="delete-radio">
                      <div>
                        <input type="radio" id="User" name="helo-dish" value="User"></input>
                        <label for="html">User</label>
                      </div>
                      <div>
                        <input type="radio" id="restourent" name="helo-dish" value="restourent"></input>
                        <label for="css">Restourent</label>
                      </div>
                      <div>
                        <input type="radio" id="driver" name="helo-dish" value="driver"></input>
                        <label for="javascript">Driver</label>
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="email">Email/Phone</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Here"
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                      />
                      {formik.touched.email && formik.errors.email && (
                        <span className="validation">
                          {formik.errors.email}
                        </span>
                      )}
                    </div>

                    <div className="form-group">
                      <label for="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter Password here"
                        value={formik.values.password}
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                      />
                      {formik.touched.password && formik.errors.password && (
                        <span className="validation">
                          {formik.errors.password}
                        </span>
                      )}
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        className="btn main_btn w-100"
                        onClick={formik.handleSubmit}
                      >
                        Delete Account
                      </button>
                    </div>
                  </form>
                </div>
                <div className="login-right">
                  <svg
                    width="142"
                    height="142"
                    viewBox="0 0 142 142"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="142" height="142" rx="33" fill="#DB1D1D" />
                    <path
                      d="M40.588 121.691H42.487L42.253 123.581C42.253 123.581 42.253 123.584 42.253 123.59C42.253 123.596 42.253 123.602 42.253 123.608L42.226 123.851L42.1 124.868L42.064 125.111L42.028 125.462L41.992 125.705L41.974 125.903L41.947 126.092V126.119V126.128L41.938 126.182L41.866 126.758L41.848 126.875L41.713 128.018H39.805L39.814 127.982L39.913 127.154L40.039 126.128L40.12 125.498V125.48H36.916L36.862 125.93L36.601 128.018H34.702L34.945 126.002L35.323 122.978L34.441 121.718H37.375L37.321 122.213L37.15 123.608L37.114 123.851L37.105 123.959L36.988 124.004L36.439 124.22H40.273V124.202L40.282 124.184V124.175V124.166L40.318 123.851V123.842L40.345 123.608L40.426 122.951L40.453 122.753L40.48 122.51L40.579 121.718L40.588 121.691ZM42.9444 121.7H49.7304C49.9044 121.7 50.0574 121.724 50.1894 121.772C50.3214 121.82 50.4264 121.883 50.5044 121.961C50.5824 122.033 50.6454 122.114 50.6934 122.204C50.7474 122.288 50.7834 122.375 50.8014 122.465C50.8194 122.555 50.8314 122.639 50.8374 122.717C50.8434 122.789 50.8434 122.849 50.8374 122.897L50.8284 122.96L50.7654 123.482C50.7594 123.512 50.7564 123.548 50.7564 123.59H45.0234L45.6174 123.833L45.5724 124.22H48.1374L47.9844 125.48H45.4194L45.3924 125.723L45.3834 125.759L45.3654 125.876V125.912L45.3384 126.11H50.4504L50.3694 126.74C50.3634 126.776 50.3544 126.824 50.3424 126.884C50.3304 126.938 50.2914 127.037 50.2254 127.181C50.1654 127.325 50.0874 127.454 49.9914 127.568C49.9014 127.676 49.7634 127.775 49.5774 127.865C49.3974 127.955 49.1904 128 48.9564 128H43.2054L43.3044 127.172L43.8264 122.96L42.9444 121.7ZM51.2282 121.7H54.1622L54.1082 122.195L53.9372 123.59L53.9012 123.833L53.8562 124.211L53.7032 125.462L53.6492 125.912L53.6222 126.11H57.9152L57.8342 126.74L57.6812 128H51.4892L51.7322 125.993L52.1102 122.96L51.2282 121.7ZM58.5014 121.7H61.4354L61.3814 122.195L61.2104 123.59L61.1744 123.833L61.1294 124.211L60.9764 125.462L60.9224 125.912L60.8954 126.11H65.1884L65.1074 126.74L64.9544 128H58.7624L59.0054 125.993L59.3834 122.96L58.5014 121.7ZM67.3765 121.7H67.6285H72.0205C72.1945 121.7 72.3475 121.724 72.4795 121.772C72.6175 121.82 72.7225 121.883 72.7945 121.961C72.8725 122.033 72.9355 122.114 72.9835 122.204C73.0375 122.288 73.0735 122.375 73.0915 122.465C73.1095 122.555 73.1215 122.639 73.1275 122.717C73.1335 122.789 73.1335 122.849 73.1275 122.897V122.96L73.0645 123.482C73.0585 123.512 73.0525 123.548 73.0465 123.59L73.0195 123.833L72.8935 124.85L72.8665 125.093L72.7405 126.11L72.6595 126.74C72.6535 126.776 72.6445 126.824 72.6325 126.884C72.6205 126.938 72.5815 127.037 72.5155 127.181C72.4555 127.325 72.3805 127.454 72.2905 127.568C72.2005 127.676 72.0625 127.775 71.8765 127.865C71.6905 127.955 71.4805 128 71.2465 128H66.7555C66.5875 128 66.4375 127.979 66.3055 127.937C66.1735 127.889 66.0685 127.832 65.9905 127.766C65.9185 127.694 65.8555 127.613 65.8015 127.523C65.7475 127.427 65.7115 127.34 65.6935 127.262C65.6755 127.184 65.6605 127.103 65.6485 127.019C65.6425 126.929 65.6395 126.869 65.6395 126.839C65.6455 126.803 65.6485 126.773 65.6485 126.749L65.8465 125.183L65.9275 124.517L65.9815 124.067L66.1165 122.96L66.1345 122.816L66.1435 122.708C66.1615 122.618 66.1855 122.534 66.2155 122.456C66.2455 122.378 66.2905 122.291 66.3505 122.195C66.4165 122.099 66.4915 122.018 66.5755 121.952C66.6595 121.88 66.7705 121.82 66.9085 121.772C67.0465 121.724 67.2025 121.7 67.3765 121.7ZM67.3135 123.59L67.9075 123.833L67.8625 124.22L67.7545 125.156L67.7185 125.381L67.7095 125.48L67.6825 125.723L67.6555 125.921L67.6285 126.11H71.4625L70.8685 125.867L70.9135 125.48L71.0665 124.22L71.1475 123.59H67.3135ZM77.8424 121.736H78.7244H84.6284C84.8024 121.736 84.9554 121.76 85.0874 121.808C85.2194 121.85 85.3244 121.91 85.4024 121.988C85.4804 122.06 85.5434 122.141 85.5914 122.231C85.6454 122.321 85.6814 122.411 85.6994 122.501C85.7174 122.591 85.7294 122.672 85.7354 122.744C85.7414 122.816 85.7414 122.876 85.7354 122.924L85.7264 122.996L85.6634 123.509C85.6574 123.545 85.6544 123.584 85.6544 123.626L85.6274 123.869L85.5014 124.886L85.4654 125.129L85.3484 126.137L85.2674 126.767C85.2614 126.803 85.2524 126.851 85.2404 126.911C85.2284 126.965 85.1894 127.064 85.1234 127.208C85.0634 127.352 84.9854 127.481 84.8894 127.595C84.7994 127.703 84.6614 127.802 84.4754 127.892C84.2954 127.982 84.0884 128.027 83.8544 128.027H78.1034L78.7244 122.996L77.8424 121.736ZM79.9214 123.626L80.5154 123.86L80.4704 124.256L80.3534 125.183L80.3264 125.417L80.3174 125.516L80.2904 125.75L80.2634 125.948L80.2364 126.137H83.4404L83.5214 125.516L83.6744 124.256L83.7464 123.626H79.9214ZM86.2843 121.7H89.2183L89.1643 122.195L88.9933 123.59L88.9573 123.833L88.9123 124.211L88.7593 125.462L88.7053 125.912L88.6243 126.578L88.4443 128H86.5453L86.7883 125.993L87.1663 122.96L86.2843 121.7ZM92.0575 121.691H92.5975H96.4495C96.6175 121.691 96.7675 121.715 96.8995 121.763C97.0315 121.805 97.1365 121.862 97.2145 121.934C97.2925 122 97.3555 122.081 97.4035 122.177C97.4575 122.267 97.4935 122.351 97.5115 122.429C97.5355 122.507 97.5505 122.591 97.5565 122.681C97.5625 122.771 97.5625 122.831 97.5565 122.861C97.5565 122.891 97.5565 122.918 97.5565 122.942L97.5205 123.194L97.4845 123.464C97.4785 123.5 97.4755 123.536 97.4755 123.572V123.581L97.4485 123.824H97.4395H95.5405L95.5675 123.581H91.7425L92.3365 123.815L92.2915 124.202H96.1345C96.3085 124.202 96.4615 124.226 96.5935 124.274C96.7255 124.322 96.8305 124.385 96.9085 124.463C96.9865 124.535 97.0495 124.616 97.0975 124.706C97.1515 124.79 97.1875 124.877 97.2055 124.967C97.2235 125.057 97.2355 125.141 97.2415 125.219C97.2475 125.291 97.2505 125.351 97.2505 125.399L97.2415 125.462L97.1695 126.092L97.1245 126.407L97.0885 126.722C97.0825 126.758 97.0735 126.806 97.0615 126.866C97.0495 126.92 97.0105 127.019 96.9445 127.163C96.8845 127.307 96.8065 127.436 96.7105 127.55C96.6205 127.658 96.4825 127.757 96.2965 127.847C96.1165 127.937 95.9095 127.982 95.6755 127.982H91.1845C91.0165 127.982 90.8665 127.961 90.7345 127.919C90.6025 127.871 90.4975 127.814 90.4195 127.748C90.3415 127.682 90.2755 127.601 90.2215 127.505C90.1735 127.409 90.1375 127.322 90.1135 127.244C90.0955 127.166 90.0835 127.085 90.0775 127.001C90.0715 126.911 90.0685 126.851 90.0685 126.821C90.0745 126.791 90.0775 126.764 90.0775 126.74L90.1675 125.984L90.1855 125.84H92.0935L92.0845 125.903L92.0575 126.092H95.8915L95.2885 125.858L95.3425 125.462H91.4905C91.3225 125.462 91.1695 125.441 91.0315 125.399C90.8995 125.351 90.7945 125.291 90.7165 125.219C90.6445 125.141 90.5815 125.057 90.5275 124.967C90.4795 124.877 90.4465 124.79 90.4285 124.706C90.4105 124.616 90.3955 124.535 90.3835 124.463C90.3775 124.385 90.3775 124.322 90.3835 124.274L90.3925 124.211L90.4105 124.058L90.5095 123.203L90.5455 122.951L89.6635 121.691H91.7965H92.0575ZM104.227 121.691H106.126L105.892 123.581C105.892 123.581 105.892 123.584 105.892 123.59C105.892 123.596 105.892 123.602 105.892 123.608L105.865 123.851L105.739 124.868L105.703 125.111L105.667 125.462L105.631 125.705L105.613 125.903L105.586 126.092V126.119V126.128L105.577 126.182L105.505 126.758L105.487 126.875L105.352 128.018H103.444L103.453 127.982L103.552 127.154L103.678 126.128L103.759 125.498V125.48H100.555L100.501 125.93L100.24 128.018H98.3408L98.5838 126.002L98.9618 122.978L98.0798 121.718H101.014L100.96 122.213L100.789 123.608L100.753 123.851L100.744 123.959L100.627 124.004L100.078 124.22H103.912V124.202L103.921 124.184V124.175V124.166L103.957 123.851V123.842L103.984 123.608L104.065 122.951L104.092 122.753L104.119 122.51L104.218 121.718L104.227 121.691Z"
                      fill="white"
                    />
                    <circle cx="71" cy="64" r="41" fill="white" />
                    <path
                      d="M71 87V102"
                      stroke="#DB1D1D"
                      stroke-width="6.6"
                      stroke-linecap="square"
                    />
                    <path
                      d="M119.17 76.4397C119.303 76.4742 119.44 76.3938 119.474 76.2599C121.387 68.6933 121.503 60.7826 119.811 53.1611C118.101 45.4582 114.591 38.2695 109.57 32.1827C104.549 26.0959 98.1587 21.2839 90.9215 18.1401C83.6844 14.9963 75.8059 13.6099 67.9303 14.0943C60.0546 14.5788 52.4054 16.9202 45.6081 20.9274C38.8108 24.9345 33.0584 30.4934 28.8211 37.1497C24.5838 43.8059 21.9821 51.3705 21.2285 59.225C20.4829 66.9964 21.5677 74.8333 24.3943 82.1083C24.4443 82.237 24.5896 82.3001 24.7181 82.2495C24.8465 82.1989 24.9095 82.0536 24.8595 81.9249C22.0618 74.7233 20.9882 66.9657 21.7262 59.2727C22.4723 51.4968 25.048 44.0079 29.2429 37.4182C33.4378 30.8285 39.1327 25.3251 45.8621 21.3581C52.5914 17.391 60.1641 15.073 67.961 14.5934C75.7578 14.1138 83.5575 15.4863 90.7223 18.5987C97.8871 21.7111 104.214 26.475 109.184 32.5009C114.155 38.5268 117.63 45.6436 119.323 53.2695C120.998 60.8139 120.884 68.6447 118.99 76.1349C118.956 76.2688 119.036 76.4052 119.17 76.4397Z"
                      fill="white"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M66.7637 65.9761C65.383 65.9761 64.2637 64.8568 64.2637 63.4761L64.2637 40H64C62.3431 40 61 41.3431 61 43V76.1099C61 81.4153 65.3009 85.7162 70.6063 85.7162C75.9117 85.7162 80.2126 81.4153 80.2126 76.1099V43C80.2126 41.3431 78.8695 40 77.2126 40H76.9487V63.4761C76.9487 64.8568 75.8294 65.9761 74.4487 65.9761C73.068 65.9761 71.9487 64.8568 71.9487 63.4761V55.5H69.2637V63.4761C69.2637 64.8568 68.1444 65.9761 66.7637 65.9761ZM69.2637 50.5H71.9487V40H69.2637V50.5Z"
                      fill="#DB1D1D"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     error: state.LoginReducer.error,
//     loading: state.LoginReducer.loading,
//   };
// };
// const mapDispatchToProps = (dispatch) => ({
//   loginRequest: (email, password, OnSuccess, OnFail) =>
//     dispatch(loginRequest(email, password, OnSuccess, OnFail)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);
