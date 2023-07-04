import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { v4 as uuidv4 } from "uuid";
import Sikayet from "../models/SikayetModel.js";

import Site from "../models/siteModel.js";
import { RatingSchema } from "../JoiModels/CreateSchema.js";

import { tokenControl } from "../utils/tokenControl.js";

const router = express.Router();

router.get("/Q", async (req, res) => {
  try {
    var latest = await Site.aggregate([
      { $unwind: "$rates" },

      { $sort: { "rates.createDate": -1 } },
      {
        $lookup: {
          from: "users",
          localField: "rates.rater",
          foreignField: "_id",
          as: "user_doc",
        },
      },
      {
        $limit: 7,
      },
    ]);

    if (!latest) {
      return res.status(400).json({ message: "post Yok" });
    } else {
      return res.status(200).json({ latest });
    }
  } catch (error) {
    return res.json({ message: "giriş başarısız" });
  }
});

router.post("/Rating", tokenControl, async (req, res) => {
  try {
    const result = await RatingSchema.validateAsync(req.body);

    const { baslik, yazi, starRating } = req.body;
    const regexList = [/lanet/, /bela/];

    const isMatch = regexList.some((rx) => rx.test(yazi));
    if (isMatch) {
      return res.status(403).json();
    }

    const isSiteExists = await Site.findOne({ domain: baslik });
    if (isSiteExists) {
      const rate = {
        rater: req.userId,
        comment: yazi,
        rate: starRating,
      };

      var newRate = await isSiteExists.updateOne({ $push: { rates: rate } });
      newRate = await isSiteExists.updateOne({
        $inc: { ratingNumber: 1, starRating: starRating },
      });
    } else {
      const createSite = await Site.create({
        domain: baslik,

        ratingNumber: 1,
        starRating,
        rates: [{ rater: req.userId, comment: yazi, rate: starRating }],
      });
    }

    return res.status(201).json(isSiteExists);
  } catch (error) {
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});

router.get("/bestSites", async (req, res) => {
  try {
    var average = await Site.aggregate([
      { $unwind: "$rates" },

      {
        $group: {
          _id: { domain: "$domain", logo: "$logo" },
          avgRate: { $avg: "$rates.rate" },
          rateCount: { $sum: 1 },
        },
      },
      { $sort: { avgRate: -1 } },
      { $limit: 10 },
      { $project: { _id: 1, avgRate: 1, rateCount: 1 } },
    ]);

    return res.status(200).json(average);
  } catch (err) {
    return res.status(400);
  }
});
router.get("/website/:id", async (req, res) => {
  try {
    var domain = req.params.id;

    const website = await Site.findOne(
      { domain },
      { rates: { $slice: [0, 10] } }
    ).populate("rates.rater", " username photo fullname ");

    res.status(200).json(website);
  } catch (err) {
    return res.status(400);
  }
});

router.get("/website/comments/:id", async (req, res) => {
  try {
    var { offset } = req.query;

    var domain = req.params.id;
    offset = parseInt(offset, 10);
    const website = await Site.findOne(
      { domain },
      { rates: { $slice: [offset, 10] } }
    ).populate("rates.rater", " username photo fullname ");

    res.status(200).json(website);
  } catch (err) {
    return res.status(400);
  }
});

router.get("/myRatings/:offset", tokenControl, async (req, res) => {
  try {
    var offset = req.params.offset;
    offset = parseInt(offset, 10);
    var rates = await Site.aggregate([
      { $unwind: "$rates" },

      { $match: { "rates.rater": req.userId } },
      { $limit: offset + 10 },
      { $skip: offset },
    ]);
    if (rates) {
      return res.status(200).json(rates);
    } else {
      return res.status(400);
    }
  } catch (err) {
    return res.status(400);
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads"); //./../client/public/uploads
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    if (extension === "svg+xml") {
      extension = "svg";
    }
    

    cb(null, uuidv4() + "." + extension);
  },
});
const upload = multer({ storage });
router.post("/AdminChangeLogo", upload.single("file"), async (req, res) => {
  try {
    const { domain } = req.body;

    const isSiteExists = await Site.findOne({ domain });
    if (isSiteExists) {
      await isSiteExists.updateOne({ $set: { logo: req.file.filename } });
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});

router.post("/DeleteRating", async (req, res) => {
  try {
    const { ratesId } = req.body;

    var silinen = await Site.updateOne(
      { "rates._id": mongoose.Types.ObjectId(ratesId) },
      { $pull: { rates: { _id: mongoose.Types.ObjectId(ratesId) } } }
    );

    return res.status(200).json();
  } catch (error) {
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});

router.post("/SikayetEt", async (req, res) => {
  try {
    const { ratesId } = req.body;
    const existingSikayet = await Sikayet.findOne({ rate: ratesId });
 
    if (!existingSikayet) {
      await Sikayet.create({ rate: ratesId });
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});

router.get("/Sikayet", async (req, res) => {
  try {
    const data = await Sikayet.find();

    return res.status(200).json(data);
  } catch (error) {
  
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});
router.post("/BelirliSikayet", async (req, res) => {
  try {
    const { ratesId } = req.body;

    const site = await Site.findOne({ "rates._id": ratesId });
    const rate = site.rates.find((r) => r._id.toString() === ratesId);
    
    return res.status(200).json({ rate });
  } catch (error) {
   
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});
router.post("/SikayetSil", async (req, res) => {
  try {
    const { ratesId } = req.body;
    var silinen = await Sikayet.deleteOne({
      rate: mongoose.Types.ObjectId(ratesId),
    });

  
    return res.status(200).json({});
  } catch (error) {
   
    return res.status(404).json({ message: "Beklenmedik problem." });
  }
});

export default router;
