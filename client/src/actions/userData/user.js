import userDataService from "../../services/userService";
export const getUserData = (title) => async (dispatch) => {
  try {
    const res = await userDataService.getUser(title);

    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("token", JSON.stringify(res.data.token));
    localStorage.setItem("login", true);

    dispatch({
      type: "getUser",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "getUserError",
      payload: true,
    });
  }
};

export const relogin = () => async (dispatch) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await userDataService.getRelogin({ token });

    localStorage.setItem("user", JSON.stringify(res.data));

    localStorage.setItem("login", true);

    dispatch({
      type: "getUser",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "getUserError",
      payload: true,
    });
  }
};
export const Logout = () => (dispatch) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("login");
  dispatch({ type: "Logout", payload: null });
};

export const ppChange = (data) => async (dispatch) => {
  try {
   
    dispatch({
      type: "getUser",
      payload: data,
    });
  } catch (err) {}
};
