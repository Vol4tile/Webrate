import express from "express";

import User from "../models/userModel.js";
import Site from "../models/siteModel.js";

import multer from "multer";
import jwt from "jsonwebtoken";
import { tokenControl } from "../utils/tokenControl.js";
import { v4 as uuidv4 } from "uuid";
import {
  signInSchema,
  signUpSchema,
  UserDataSchema,
  searchUserSchema,
} from "../JoiModels/CreateSchema.js";
import bcrypt from "bcrypt";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); //./../client/public/uploads
  },
  filename: function (req, file, cb) {
   
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, uuidv4() + "." + extension);
  },
});
const upload = multer({ storage });
const router = express.Router();

router.post("/signup", upload.single("file"), async (req, res) => {
  try {
   
    const result = await signUpSchema.validateAsync(req.body);
   
    const { fullname, password, email, username } = req.body;
 
    const photo = req.file.filename;
    const userExists = await User.findOne({ username: username });
   
    if (userExists) {
      return res
        .status(401)
        .json({ message: "Bu kullanıcı adı kullanılmakta." });
    }
    const hashedHassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      fullname,
      password: hashedHassword,
      email,
      username,
      photo,
    });
    
    return res.status(200).json({ message: "işlem tamam" });
  } catch (error) {
    
    return res.status(401).json({ essage: "create user fail" });
  }
});
router.post("/signin", async (req, res) => {
  try {
    try {
      
      const result = await signInSchema.validateAsync(req.body);
    } catch (error) {
     

      return res.status(401).json(error.message);
    }
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "email yanlış" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "şifre yanlış" });
    }
    let token = jwt.sign(
      {
        username,
        password: user.password,
      },
      "secret",
      { expiresIn: "10h" }
    );

    return res.status(200).json({ user, message: "Giriş Başarılı", token });
  } catch (error) {
    
    return res.json({ message: "giriş başarısız" });
  }
});
router.post("/searchUser", async (req, res) => {
  try {
    try {
      const result = await searchUserSchema.validateAsync(req.body);
    } catch (error) {
     
      return res.status(401).json(error.message);
    }
    let { search } = req.body;
    search = search.replace(
      /[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/gi,
      "\\$&"
    );

    /* const user = await User.find({
      $or: [
        { username: { $regex: ".*" + search + ".*", $options: "i" } },
        { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
      ],
    }); */
    const site = await Site.find({
      domain: { $regex: ".*" + search + ".*", $options: "i" },
    });

    if (!site) {
      return res.status(400).json({ message: "hata" });
    }

    return res.status(200).json({ site });
  } catch (error) {
  
    return res.status(400).json({ message: "giriş başarısız" });
  }
});

router.get("/signin", async (req, res) => {
  try {
    try {
      const result = await signInSchema.validateAsync(req.body);
    } catch (error) {
     
      return res.status(401).json(error.message);
    }
    const { email, password } = req.body;
    const user = await User.find({}).select({ fullname: 1, email: 1, _id: 0 });
    if (!user) {
      return res.status(400).json({ message: "Kullanıcı Yok" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
    
    return res.json({ message: "giriş başarısız" });
  }
});
router.post("/userData", async (req, res) => {
  try {
    try {
      const result = await UserDataSchema.validateAsync(req.body);
    } catch (error) {
     
      return res.status(401).json(error.message);
    }
    const { username } = req.body;
    const user = await User.findOne({ username }).select({
      fullname: 1,
      email: 1,
      _id: 0,
      photo: 1,
      createDate: 1,
      followers: 1,
      followings: 1,
      username: 1,
    });
    if (!user) {
      return res.status(400).json({ message: "Kullanıcı Yok" });
    } else {
      return res.status(200).json({ user });
    }
  } catch (error) {
   
    return res.json({ message: "giriş başarısız" });
  }
});

router.put("/updateUsername", tokenControl, async (req, res) => {
  try {
   
    let newUsername = req.body.data.newUsername;
   
    const user = await User.findOne({ id: req.id });

    await user.updateOne({ $set: { username: newUsername } });
    let token = jwt.sign(
      {
        username: newUsername,
        password: user.password,
      },
      "secret",
      { expiresIn: "10h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
   
    res.status(500).send(err);
  }
});
router.put("/updatePassword", tokenControl, async (req, res) => {
  try {
    
    let newPassword = req.body.data.newPassword;
    const hashedHassword = await bcrypt.hash(newPassword, 10);
   
    const user = await User.findOne({ _id: req.userId });
   
    await user.updateOne({ $set: { password: hashedHassword } });
    let token = jwt.sign(
      {
        username: user.username,
        password: hashedHassword,
      },
      "secret",
      { expiresIn: "10h" }
    );

    return res.status(200).json({ token });
  } catch (err) {
    
    
    res.status(500).send(err);
  }
});
router.put("/updateFullname", tokenControl, async (req, res) => {
  try {
    let newFullname = req.body.data.newFullname;
 
    const user = await User.findOne({ _id: req.userId });
   
    await user.updateOne({ $set: { fullname: newFullname } });
    return res.status(200).json();
  } catch (err) {
    
    
    res.status(500).send(err);
  }
});

router.post(
  "/updatePP",
  tokenControl,
  upload.single("file"),
  async (req, res) => {
    try {
     
      const photo = req.file.filename;

      const user = await User.findOne({ _id: req.userId });

      if (user) {
        await user.updateOne({ $set: { photo } });
        return res.status(200).json({ photo,message: "işlem tamam" });
      }

      return res.status(401).json({ message: " fail" });
    } catch (error) {
     
      return res.status(401).json({ message: " fail" });
    }
  }
);

router.post("/relogin", async (req, res) => {
  try {
   
    const { token } = req.body;

    var decoded = jwt.verify(token, "secret");
   
    var username = decoded.username;

    const userPassword = await User.findOne({ username }).select({
      password: 1,
      _id: 1,
      photo:1,fullname:1,
      username:1,
      isAdmin:1
    });

    if (userPassword.password === decoded.password) {
      req.userId = userPassword._id;
     return res.status(200).json({user:userPassword})
    }
  } catch (error) {
    

    return res.status(401).json(error.message);
  }
});

export default router;
