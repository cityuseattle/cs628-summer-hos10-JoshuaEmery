//here we define the schema for the record model
const mongoose = require("mongoose");
//defininng the record model
const recordSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    position: {
      type: String,
      required: [true, "position is required"],
    },
    level: {
      type: String,
      required: [true, "level is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Record", recordSchema);
