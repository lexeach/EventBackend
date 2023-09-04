const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    index: { type: Number },
    user: { type: String },
    referral: { type: String },
    level: { type: Number },
    time: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("levelincome", registrationSchema);
