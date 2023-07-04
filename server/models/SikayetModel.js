import mongoose from "mongoose";

const sikayetSchema = mongoose.Schema({
  rate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Site",
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: "Must have start date - default value is the created date",
  },
});

export default mongoose.model("Sikayet", sikayetSchema);
