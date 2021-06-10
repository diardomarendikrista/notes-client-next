import axios from "../../axios";
import Swal from "sweetalert2";

export function setFormType(payload) {
  return { type: "formType/setFormType", payload };
}

export function setProfile(payload) {
  return { type: "profile/setProfile", payload };
}

export function fetchProfile() {
  return async (dispatch) => {
    try {
      const headers = {
        access_token: localStorage.getItem("access_token"),
      };
      const { data } = await axios.get("/user", { headers });
      dispatch(setProfile(data.user));
    } catch (error) {
      if (!error.response)
        alert(
          "Sorry, connection to server failed / server down. Please contact administrator"
        );
      else console.log(error.response);
    }
  };
}

export function signin(user) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post("/login", user);
      localStorage.setItem("access_token", data.access_token);
      return true;
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alertError("Login Error", error.response.data.message);
    }
  };
}

export function signup(newUser) {
  return async (dispatch) => {
    try {
      // check, is password and repeat password is same?
      await axios.post("/register", newUser);
      // if success.. move to login and clear form
      dispatch(setFormType("login"));
      return true;
    } catch (error) {
      console.log(error.response);
      if (!error.response) connectionDown();
      else alertError("Register Error", error.response.data.message);
    }
  };
}

function connectionDown() {
  Swal.fire(
    'Information!',
    'Sorry, connection to server failed / server down. Please contact administrator.',
    'warning'
  )
}

// template alert agar bisa dipakai dimana2
export function alertError (title, message) {
  Swal.fire(
    title,
    message,
    'error'
  )
}
