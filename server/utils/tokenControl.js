import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const tokenControl = async (req, res, next) => {
  try {
    var token = req.body.headers?.token || req.headers.token;

    var decoded = jwt.verify(token, "secret");
  
    var username = decoded.username;

    const userPassword = await User.find({ username }).select({
      password: 1,
      _id: 1,
    });

    if (userPassword[0].password === decoded.password) {
      req.userId = userPassword[0]._id;
      next();
    }
  } catch (err) {
    
  }
};
export { tokenControl };
