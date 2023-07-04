import { HTTP } from "../axios";

const getUser = (formData) => {
  return HTTP.post("/users/signin", formData);
};

const getRelogin = (formData) => {
  return HTTP.post("/users/relogin", formData);
};
const userService = {
  getUser,
  getRelogin,
};

export default userService;
