import { LoginApi } from "../Utilities/Api";
export const baseUrl = "https://api.hellodish.in/";
//export const baseUrl = "https://rdemo.ecommercesourcecode.com/dish/";

export async function signIn(email, password) {
  try {
    // Send request
    const loginOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: email, password: password }),
    };

    let data = await fetch(LoginApi, loginOptions);

    if (data.ok) {
      let loginResponseData = await data.json();
      console.log("newtk", loginResponseData.token);
      localStorage.setItem("authToken", loginResponseData.token);
      localStorage.setItem("userName", email);
      let userData = await getUser();
      return {
        isOk: true,
        data: userData.data,
      };
    }
    //handle 400 bad request
    else {
      return {
        isOk: false,
        message: "Incorrect Username or Password ",
      };
    }
  } catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

export async function getUser() {
  try {
    // Send request
    const userName = localStorage.getItem("userName");
    const authToken = localStorage.getItem("authToken");

    if (userName === null || authToken === null) {
      return {
        isOk: false,
      };
    } else if (userName && authToken) {
      return {
        isOk: true,
        data: userName,
      };
    } else {
      return {
        isOk: false,
      };
    }
  } catch {
    return {
      isOk: false,
    };
  }
}
