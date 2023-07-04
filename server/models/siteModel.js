import mongoose from "mongoose";

const siteSchema = mongoose.Schema({
  domain: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    default:"defaultWebsiteLogo.svg"
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
  ratingNumber: { type: Number },
  starRating: {
    type: Number,
  },
  rates: [
    {
      rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "Bir paylaşan olmalı",
      },
      comment:{
        type:String
      },
      rate:{
        type:Number
      },
      createDate:{
        type: Date,
        default: Date.now,
        required: "Must have start date - default value is the created date",
      }
    },
  ],
});

export default mongoose.model("Site", siteSchema);
